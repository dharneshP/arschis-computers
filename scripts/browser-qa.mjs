import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { browserSession } from './browser-session.mjs';

const b = await browserSession();
const results = [];
async function check(name, expression) {
  const actual = await b.evaluate(expression);
  assert.ok(actual, name + ': ' + JSON.stringify(actual));
  results.push(name);
}
async function click(selector) {
  const point = await b.evaluate(`(() => { const e=document.querySelector(${JSON.stringify(selector)}); if(!e)throw new Error('Missing element'); e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
  await b.send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await b.send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
}
async function setValue(selector, value) {
  await b.evaluate(`(() => {const e=document.querySelector(${JSON.stringify(selector)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);
}
async function dialogClosed() { await b.waitFor('!document.querySelector("dialog[open]")'); }
const routePaths = ['/', '/store', '/store/laptops', '/store/desktops', '/store/printers', '/store/monitors', '/computer-sales-erode', '/computer-service-erode', '/laptop-service-erode', '/printer-service-erode', '/gallery', '/faq'];

try {
  await b.viewport(390, 844);
  await b.navigate('/store');
  await click('header button[aria-haspopup="dialog"]');
  await b.waitFor('!!document.querySelector("dialog[open]")');
  await check('booking has a name, description and native modal semantics', 'document.querySelector("dialog:modal").getAttribute("aria-labelledby") && document.querySelector("dialog:modal").getAttribute("aria-describedby")');
  await check('booking hides sticky contact and locks scrolling', '!document.querySelector("nav[aria-label=\\\"Quick contact\\\"]") && document.body.style.position === "fixed"');
  await check('initial focus avoids forcing the mobile keyboard open', 'document.activeElement.getAttribute("aria-label") === "Close Book a Service"');
  await b.key('Tab', 8);
  await check('Shift+Tab wraps to last dialog control', 'document.activeElement.closest("dialog") && document.activeElement.textContent.trim() === "Call Now"');
  await b.key('Tab');
  await check('Tab wraps to first dialog control', 'document.activeElement.getAttribute("aria-label") === "Close Book a Service"');
  await b.key('Escape'); await dialogClosed();
  await check('Escape restores booking trigger focus and scrolling', 'document.activeElement === document.querySelector("header button[aria-haspopup=dialog]") && document.body.style.position === ""');

  await click('button[aria-label="Open menu"]'); await b.waitFor('!!document.querySelector("dialog[open]")');
  await check('mobile menu hides sticky bar', '!document.querySelector("nav[aria-label=\\\"Quick contact\\\"]")');
  await click('dialog button:not([aria-label])');
  await b.waitFor('document.querySelector("dialog[open] h2")?.textContent === "Book a Service"');
  await check('menu to booking leaves exactly one owned dialog', 'document.querySelectorAll("dialog[open]").length === 1 && document.body.style.position === "fixed"');
  await b.key('Escape'); await dialogClosed();
  await check('menu to booking cleanup restores contact bar', '!!document.querySelector("nav[aria-label=\\\"Quick contact\\\"]") && document.body.style.position === ""');

  await click('header button[aria-haspopup="dialog"]'); await b.waitFor('!!document.querySelector("dialog[open]")');
  await click('#booking-form button[type="submit"]');
  await b.waitFor('document.querySelectorAll("#booking-form [aria-invalid=true]").length > 0');
  await check('invalid form shows inline errors and focuses first error', 'document.activeElement.id === "booking-name" && document.getElementById("booking-services-error")');
  await setValue('#booking-name', 'QA Customer'); await setValue('#booking-mobile', '+91 98765 43210');
  await setValue('#booking-problem', 'Laptop will not start');
  await click('input[type=checkbox][value="PC / Laptop"]'); await click('input[type=checkbox][value="Printer"]');
  await click('input[type=radio][value="On-site Service"]');
  await b.evaluate('window.__originalOpen=window.open;window.open=()=>null');
  await click('#booking-form button[type="submit"]');
  await b.waitFor('!!document.getElementById("booking-handoff")');
  await check('blocked handoff keeps details and offers direct fallback', 'document.getElementById("booking-name").value === "QA Customer" && document.getElementById("booking-handoff").textContent.includes("could not open") && document.querySelector("#booking-handoff a").href.startsWith("https://wa.me/")');
  await check('handoff message preserves all selections and preference', '(() => {const text=new URL(document.querySelector("#booking-handoff a").href).searchParams.get("text");return ["QA Customer","+91 98765 43210","PC / Laptop, Printer","Laptop will not start","On-site Service"].every(v=>text.includes(v));})()');
  await b.evaluate('window.open=()=>{window.__handoffTab={opener:window,location:{href:""}};return window.__handoffTab;}');
  await click('#booking-form button[type="submit"]');
  await b.waitFor('document.getElementById("booking-handoff").textContent.includes("Continue your request")');
  await check('successful handoff clears opener and does not claim confirmation', 'window.__handoffTab.opener === null && window.__handoffTab.location.href.startsWith("https://wa.me/") && document.getElementById("booking-name").value === "QA Customer" && document.getElementById("booking-handoff").textContent.includes("wait for our team")');
  await b.evaluate('window.open=window.__originalOpen');
  await b.screenshot('after-booking-mobile'); await b.key('Escape'); await dialogClosed();

  await click('button[aria-label="Open menu"]'); await b.waitFor('!!document.querySelector("dialog[open]")');
  await b.viewport(1280, 900); await dialogClosed();
  await check('resizing to desktop releases menu ownership', 'document.body.style.position === ""');

  // A synthetic nested pair exercises independent ownership without adding a test route.
  await b.evaluate(`(async()=>{ const {modal}=await import('/src/lib/overlays.ts');window.__pair=[1,2].map(i=>{const d=document.createElement('dialog');d.innerHTML='<button>Dialog '+i+'</button>';document.body.append(d);return {d,action:modal(d)};}); })()`);
  await check('nested dialogs acquire independent ownership', 'document.querySelectorAll("dialog[open]").length === 2 && document.body.style.position === "fixed"');
  await b.evaluate('window.__pair[1].action.destroy();window.__pair[1].d.remove()');
  await check('closing one owner does not unlock another', 'document.querySelectorAll("dialog[open]").length === 1 && document.body.style.position === "fixed"');
  await b.evaluate('window.__pair[0].action.destroy();window.__pair[0].d.remove()');
  await check('last owner restores original styles', 'document.body.style.position === "" && document.documentElement.style.overflow === ""');

  await b.viewport(390, 844); await b.navigate('/faq');
  await b.evaluate('window.__fixtures=await import("/src/lib/testing/browser-fixtures.ts");await window.__fixtures.showFixture("store")');
  await b.waitFor('document.querySelectorAll("[data-product-id]").length === 4');
  await check('product fixtures render shared cards and condition labels', 'document.querySelector("[data-product-id=qa-new]").textContent.includes("New") && document.querySelector("[data-product-id=qa-refurb]").textContent.includes("Refurbished")');
  await check('long names and specifications do not overflow mobile fixture layout', 'document.documentElement.scrollWidth <= document.documentElement.clientWidth');
  await click('main button[aria-haspopup="dialog"]');
  await b.waitFor('!!document.getElementById("mobile-category")');
  await check('category normalization removes duplicate options', 'Array.from(document.getElementById("mobile-category").options).filter(o=>o.text.toLowerCase().includes("laptop")).length === 1');
  await setValue('#mobile-category', 'Laptop'); await setValue('#mobile-condition', 'Used');
  await click('dialog button:not([aria-label]):last-child'); await dialogClosed();
  await b.waitFor('document.querySelectorAll("[data-product-id]").length === 1');
  await check('combined category and condition filters match normalized values', '!!document.querySelector("[data-product-id=qa-used]")');
  await setValue('#product-search', 'not-a-product');
  await b.waitFor('document.querySelectorAll("[data-product-id]").length === 0');
  await check('search retains helpful no-results state', 'document.body.textContent.includes("No products match these filters")');
  await b.evaluate('window.__fixtures.cleanup()');

  await b.evaluate('window.__fixtures.showFixture("gallery")'); await b.waitFor('!!document.querySelector("button[aria-label=\\\"Open QA image\\\"]")');
  await click('button[aria-label="Open QA image"]'); await b.waitFor('!!document.querySelector("dialog[open]")');
  await check('gallery image hides sticky contact and locks body', '!document.querySelector("nav[aria-label=\\\"Quick contact\\\"]") && document.body.style.position === "fixed"');
  await b.key('Escape'); await dialogClosed();
  await check('gallery Escape restores image trigger focus', 'document.activeElement.getAttribute("aria-label") === "Open QA image"');
  await click('button[aria-label="Play QA video"]'); await b.waitFor('!!document.querySelector("dialog[open] iframe")');
  await b.key('Escape'); await dialogClosed();
  await check('video closes on Escape and iframe is removed', '!document.querySelector("dialog iframe") && document.body.style.position === ""');
  await b.evaluate('window.__fixtures.cleanup()');

  for (const [label, width, height] of [['small-mobile',320,740],['mobile',390,844],['tablet',768,1024],['desktop',1440,1000]]) {
    await b.viewport(width,height);
    for (const path of routePaths) {
      await b.navigate(path);
      await check(`${label} ${path}: one footer, available booking and no horizontal overflow`, 'document.querySelectorAll("footer").length === 1 && document.querySelector("header button[aria-haspopup=dialog]").getBoundingClientRect().height >= 44 && document.documentElement.scrollWidth <= document.documentElement.clientWidth');
      await check(`${label} ${path}: title, description and canonical remain present`, '!!document.title && !!document.querySelector("meta[name=description]")?.content && document.querySelector("link[rel=canonical]")?.href.startsWith("https://arschiscomputers.in/")');
      if ((label === 'mobile' || label === 'desktop') && (path === '/' || path === '/store')) await b.screenshot('after-' + (path === '/' ? 'home' : 'store') + '-' + label);
    }
    console.log('Passed route/responsive checks at ' + label);
  }
  await b.viewport(390,844); await b.navigate('/');
  await click('button[aria-label="Open menu"]'); await b.waitFor('!!document.querySelector("dialog[open]")');
  await click('dialog a[href="/#contact"]'); await dialogClosed();
  await b.waitFor('location.hash === "#contact"');
  await b.waitFor('document.getElementById("contact").getBoundingClientRect().top >= 0 && document.getElementById("contact").getBoundingClientRect().top < innerHeight');
  await check('mobile contact anchor is visible and reachable', '(() => {const e=document.getElementById("contact"),r=e.getBoundingClientRect();return getComputedStyle(e).display!=="none" && r.top>=0 && r.top<innerHeight;})()');
  await check('sticky contact has only Call and WhatsApp', 'document.querySelectorAll("nav[aria-label=\\\"Quick contact\\\"] a").length === 2');
  await b.send('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await check('reduced motion disables smooth scrolling', 'getComputedStyle(document.documentElement).scrollBehavior === "auto"');
  await b.send('Emulation.setEmulatedMedia', {features:[]});
  await mkdir('.qa', {recursive:true});
  await writeFile('.qa/browser-results.json', JSON.stringify({passed:results.length,checks:results},null,2));
  console.log('PASS: ' + results.length + ' browser checks.');
} catch (error) {
  await b.screenshot('qa-failure');
  console.error('FAIL after ' + results.length + ' checks: ' + error.message);
  process.exitCode = 1;
} finally { b.close(); }
