import { writeFile, mkdir } from 'node:fs/promises';

// Uses an already running local Chrome. No browser downloads or production access.
export async function browserSession() {
  const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
  const target = targets.find((entry) => entry.type === 'page');
  if (!target) throw new Error('Start local Chrome with remote debugging on port 9222.');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let sequence = 0;
  const pending = new Map();
  const events = [];
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) request?.reject(new Error(message.error.message));
      else request?.resolve(message.result);
    } else events.push(message);
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const code = expression.includes('await ') && !expression.trimStart().startsWith('(async')
      ? `(async () => { ${expression} })()` : expression;
    const result = await send('Runtime.evaluate', { expression: code, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text + ': ' + result.exceptionDetails.exception?.description);
    return result.result.value;
  };
  const waitFor = async (expression, timeout = 20000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await evaluate(expression)) return;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error('Timed out: ' + expression);
  };
  const viewport = (width, height) => send('Emulation.setDeviceMetricsOverride', {
    width, height, deviceScaleFactor: 1, mobile: width < 768
  });
  const navigate = async (path) => {
    await send('Page.navigate', { url: (process.env.QA_BASE_URL || 'http://127.0.0.1:5174') + path });
    await waitFor('document.readyState !== "loading" && !!document.querySelector("main")', 60000);
    await waitFor('!!document.querySelector("header button")?.__svelte_meta');
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    await evaluate('document.fonts.ready.then(() => true)');
  };
  const screenshot = async (name) => {
    await mkdir('.qa/screenshots', { recursive: true });
    const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile('.qa/screenshots/' + name + '.png', Buffer.from(result.data, 'base64'));
  };
  const key = async (key, modifiers = 0) => {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key, modifiers, windowsVirtualKeyCode: key === 'Tab' ? 9 : key === 'Escape' ? 27 : 13 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key, modifiers });
  };
  await send('Page.enable');
  await send('Runtime.enable');
  return { send, evaluate, waitFor, viewport, navigate, screenshot, key, events, close: () => socket.close() };
}
