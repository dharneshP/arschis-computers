import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { validateBooking, createBookingMessage } from '../src/lib/booking.ts';

// Run the real helpers with the existing TypeScript compiler; no test dependencies.
const source = (await readFile(new URL('../src/lib/products.ts', import.meta.url), 'utf8'))
  .replace('$lib/contact', new URL('../src/lib/contact.ts', import.meta.url).href);
const compiled = ts.transpile(source, { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext });
const products = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

const valid = { name: 'Test Customer', mobile: '9876543210', selectedServices: ['PC / Laptop', 'Printer'], problem: 'Laptop will not start', preferredType: 'On-site Service' };
test('booking rejects empty, whitespace-only, short and invalid inputs', () => {
  assert.deepEqual(Object.keys(validateBooking({ ...valid, name: '  ', mobile: '12', selectedServices: [], problem: '   ' })).sort(), ['mobile', 'name', 'problem', 'selectedServices']);
  for (const mobile of ['+++', '987654321a', '123', '12345678901234567890']) assert.ok(validateBooking({ ...valid, mobile }).mobile);
});
test('booking accepts local, country-code and formatted international numbers', () => {
  for (const mobile of ['9876543210', '+91 98765 43210', '919876543210', '+44 7700 900123']) assert.deepEqual(validateBooking({ ...valid, mobile }), {});
});
test('WhatsApp message retains every booking field and multiple selections', () => {
  const message = createBookingMessage(valid);
  for (const value of [valid.name, valid.mobile, 'PC / Laptop, Printer', valid.problem, valid.preferredType]) assert.ok(message.includes(value));
  const url = new URL(products.getProductQuoteUrl('Dell & HP / Test'));
  assert.equal(url.hostname, 'wa.me');
  assert.ok(url.searchParams.get('text').includes('Dell & HP / Test'));
});
test('category options and matching normalize casing and repeated whitespace', () => {
  const fixture = [{ _id: '1', category: ' Gaming   Laptop ' }, { _id: '2', category: 'gaming laptop' }, { _id: '3', category: 'UPS' }, { _id: '4' }];
  assert.equal(products.getProductCategories(fixture).length, 2);
  assert.equal(products.normalizeProductValue(fixture[0].category), products.normalizeProductValue(fixture[1].category));
  assert.equal(products.normalizeProductValue(undefined), '');
});
test('condition labels preserve known values and expose missing conditions honestly', () => {
  assert.equal(products.getConditionLabel(' new '), 'New');
  assert.equal(products.getConditionLabel('REFURBISHED'), 'Refurbished');
  assert.equal(products.getConditionLabel(' used '), 'Used');
  assert.equal(products.getConditionLabel(), 'Condition to confirm');
});
test('product images recover from missing/malformed URLs and provide larger candidates', () => {
  for (const image of [undefined, 'bad URL', 'javascript:alert(1)']) assert.equal(products.getOptimizedProductImage(image, 640), '/logo-header.png');
  assert.equal(products.getProductImageSrcset('bad URL'), undefined);
  assert.match(products.getProductImageSrcset('https://cdn.sanity.io/images/test.jpg'), /960w/);
  assert.deepEqual(products.formatProductSpecs('i5 | 8GB, 512GB SSD | '), ['i5', '8GB', '512GB SSD']);
});

test('foundation text/action color pairs meet WCAG AA normal-text contrast', async () => {
  const css = await readFile(new URL('../src/app.css', import.meta.url), 'utf8');
  const color = (name) => css.match(new RegExp('--color-brand-' + name + ': (#[0-9a-f]+);'))[1];
  const luminance = (hex) => {
    const rgb = hex.slice(1).match(/../g).map(v => parseInt(v,16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return rgb[0]*0.2126 + rgb[1]*0.7152 + rgb[2]*0.0722;
  };
  for (const [fg,bg] of [['#ffffff',color('blue')],['#ffffff',color('whatsapp')],[color('text'),'#ffffff'],[color('muted'),color('neutral')],[color('red'),'#ffffff'],[color('yellow'),color('navy')]]) {
    const values=[luminance(fg),luminance(bg)].sort((a,b)=>b-a);
    assert.ok((values[0]+0.05)/(values[1]+0.05) >= 4.5, fg + ' on ' + bg);
  }
});
