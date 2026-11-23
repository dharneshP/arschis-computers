import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { browserSession } from './browser-session.mjs';

const b = await browserSession();
const passed = [];
async function check(name, expression) { assert.ok(await b.evaluate(expression), name); passed.push(name); }
try {
  for (const file of ['static/logo-header.png','static/logo.png','static/logo1.png']) {
    const expected = createHash('sha256').update(execFileSync('git',['show','HEAD:'+file], { maxBuffer: 8 * 1024 * 1024 })).digest('hex');
    assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),expected,file+' unchanged');
  }
  for (const [label,width,height] of [['small-mobile',320,740],['mobile',390,844],['tablet',768,1024],['desktop',1440,1000]]) {
    await b.viewport(width,height); await b.navigate('/');
    await check(label+' correct hero, one main/h1/footer', `document.querySelectorAll('main').length===1 && document.querySelectorAll('h1').length===1 && document.querySelector('h1').textContent==='Your Trusted Computer Partner in Erode' && document.querySelectorAll('footer').length===1`);
    await check(label+' navigation matches brief', `Array.from(document.querySelectorAll('nav[aria-label="Primary navigation"] a')).map(e=>e.textContent).join(',')==='Home,Shop,Services,About,Contact'`);
    await check(label+' categories link to existing pages', `Array.from(document.querySelectorAll('section[aria-labelledby="categories-heading"] a')).map(e=>new URL(e.href).pathname).join(',')==='/store/laptops/,/store/desktops/,/store/monitors/,/store/printers/'`);
    await check(label+' actual featured product enquiries and condition badges', `document.querySelectorAll('#featured-products [data-product-id]').length===4 && Array.from(document.querySelectorAll('#featured-products [data-product-id]')).every(e=>e.textContent.includes('Condition:') && e.querySelector('a').href.startsWith('https://wa.me/'))`);
    for(const id of ['hero-heading','categories-heading','products-heading','services','why-heading','google-reviews','process-heading','work-heading','about','contact']) {
      await b.evaluate(`document.getElementById(${JSON.stringify(id)}).scrollIntoView({block:'center',behavior:'instant'})`);
      // Give the lazy review observer a visible frame before the next scroll.
      if (id === 'google-reviews') await b.waitFor(`document.querySelector('#google-reviews [aria-busy]')?.getAttribute('aria-busy')==='false'`);
      await check(label+' '+id+' has no horizontal overflow', 'document.documentElement.scrollWidth<=document.documentElement.clientWidth');
    }
    await b.waitFor(`document.querySelector('#google-reviews [aria-busy]')?.getAttribute('aria-busy')==='false'`);
    await check(label+' real Google reviews loaded', `document.querySelectorAll('#google-reviews article').length>0 && !!document.querySelector('#google-reviews strong')`);
    await check(label+' configured contact and map', `document.querySelector('#contact').textContent.includes('10:00 AM - 9:00 PM') && document.querySelector('#contact a[href="tel:+919944252527"]') && document.querySelector('#contact iframe').src.includes('maps.google.com')`);
    await b.evaluate('scrollTo({top:0,behavior:"instant"})');
    if(label==='mobile'||label==='desktop') {
      await b.waitFor(`document.querySelector('.hero-visual img').complete`);
      await b.screenshot('phase2-home-'+label);
      const metrics=await b.send('Page.getLayoutMetrics');
      const screenshot=await b.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width:metrics.cssLayoutViewport.clientWidth,height:metrics.cssContentSize.height,scale:1}});
      await writeFile('.qa/screenshots/phase2-home-'+label+'-full.png',Buffer.from(screenshot.data,'base64'));
    }
  }
  await b.viewport(390,844);await b.navigate('/');
  await b.evaluate(`const f=document.querySelector('#mobile-header-search').form;document.querySelector('#mobile-header-search').value='Lenovo';f.requestSubmit();`);
  await b.waitFor(`location.pathname==='/store' && new URL(location.href).searchParams.get('q')==='Lenovo' && document.querySelector('#product-search')?.value==='Lenovo'`);
  await check('mobile header search reaches filtered catalogue', `document.querySelectorAll('[data-product-id]').length>0 && Array.from(document.querySelectorAll('[data-product-id] h2')).every(e=>e.textContent.toLowerCase().includes('lenovo'))`);
  await b.viewport(1440,1000);await b.navigate('/');
  await b.evaluate(`document.querySelector('#header-search').value='no-qa-product-match';document.querySelector('#header-search').form.requestSubmit();`);
  await b.waitFor(`location.pathname==='/store' && document.querySelector('#product-search')?.value==='no-qa-product-match'`);
  await check('desktop search supports no results', `document.querySelectorAll('[data-product-id]').length===0 && document.body.textContent.includes('No products match these filters')`);

  // Controlled browser-only responses exercise unavailable/empty/loading UI without changing APIs.
  for(const mode of ['loading','error','empty']) {
    const init=await b.send('Page.addScriptToEvaluateOnNewDocument',{source:`const originalFetch=window.fetch;window.fetch=(input,options)=>{if(String(input).includes('/api/reviews')){${mode==='loading'?'return new Promise(()=>{});':mode==='error'?'return Promise.resolve(new Response("unavailable",{status:502}));':'return Promise.resolve(new Response(JSON.stringify({reviews:[],rating:4.5,userRatingsTotal:10}),{status:200,headers:{"Content-Type":"application/json"}}));'}}return originalFetch(input,options);};`});
    await b.navigate('/');await b.evaluate(`document.getElementById('google-reviews').scrollIntoView({block:'center',behavior:'instant'})`);
    if(mode==='loading') await check('reviews loading state remains visible', `document.querySelector('#google-reviews [aria-busy]').getAttribute('aria-busy')==='true' && document.querySelector('#google-reviews').textContent.includes('Loading Google reviews')`);
    else {
      await b.waitFor(`document.querySelector('#google-reviews [aria-busy]').getAttribute('aria-busy')==='false'`);
      await check('reviews '+mode+' state has Google fallback', `!!document.querySelector('#google-reviews a[target="_blank"]') && document.querySelector('#google-reviews').textContent.includes(${JSON.stringify(mode==='error'?'temporarily unavailable':'No review comments')})`);
    }
    await b.send('Page.removeScriptToEvaluateOnNewDocument',{identifier:init.identifier});
  }
  await b.navigate('/faq');
  await b.evaluate(`window.__fixtures=await import('/src/lib/testing/browser-fixtures.ts');await window.__fixtures.showFixture('recent')`);
  await b.waitFor(`document.querySelector('main') && document.body.textContent.includes('QA recent project')`);
  await check('recent gallery fixture renders provided image and existing gallery link', `!!document.querySelector('a[href="/gallery"] img')`);
  await b.evaluate('window.__fixtures.cleanup()');
  await writeFile('.qa/homepage-results.json',JSON.stringify({passed:passed.length,checks:passed},null,2));
  console.log('PASS: '+passed.length+' homepage checks; screenshots captured; logos unchanged.');
} catch(error) { await b.screenshot('phase2-qa-failure');console.error(error);process.exitCode=1; }
finally { b.close(); }
