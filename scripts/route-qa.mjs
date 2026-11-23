import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { storeCategories } from '../src/lib/store-categories.ts';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5174';
const baseline = (path) => execFileSync('git', ['show', 'HEAD:' + path], { encoding: 'utf8' });
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const pages = [
  ['/', 'src/routes/+page.svelte', 1], ['/store', 'src/routes/store/+page.svelte', 0],
  ['/faq', 'src/routes/faq/+page.svelte', 0], ['/gallery', 'src/routes/gallery/+page.svelte', 0],
  ['/computer-sales-erode', 'src/routes/computer-sales-erode/+page.svelte', 1],
  ['/computer-service-erode', 'src/routes/computer-service-erode/+page.svelte', 2],
  ['/laptop-service-erode', 'src/routes/laptop-service-erode/+page.svelte', 2],
  ['/printer-service-erode', 'src/routes/printer-service-erode/+page.svelte', 2]
].map(([path, file, graphs]) => {
  const source = baseline(file);
  return { path, title: source.match(/\btitle="([^"]+)"/)[1], description: source.match(/\bdescription="([^"]+)"/)[1], canonicalPath: source.match(/\bpath="([^"]+)"/)[1], graphs };
});
for (const [slug, category] of Object.entries(storeCategories)) {
  pages.push({ path: '/store/' + slug, title: category.title, description: category.description, canonicalPath: '/store/' + slug + '/', graphs: 1 });
}
const results = [];
for (const page of pages) {
  const response = await fetch(base + page.path);
  assert.equal(response.status, 200, page.path);
  const html = await response.text();
  assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)[1]), page.title, page.path + ' title');
  assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)[1]), page.description, page.path + ' description');
  assert.equal(html.match(/<link rel="canonical" href="([^"]*)"/)[1], 'https://arschiscomputers.in' + page.canonicalPath, page.path + ' canonical');
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:card', 'twitter:title']) assert.ok(html.includes('"' + tag + '"'), page.path + ' ' + tag);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  assert.equal(graphs.length, page.graphs, page.path + ' structured data');
  assert.equal((html.match(/<footer\b/g) || []).length, 1, page.path + ' footer');
  if (page.path === '/gallery') assert.ok(html.includes('content="noindex,follow"'));
  results.push({ path: page.path, status: response.status, metadataMatchesBaseline: true, structuredDataGraphs: graphs.length });
}
for (const path of ['/store/not-a-category', '/store/__proto__']) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200); // Existing category fallback behavior is intentionally preserved.
  assert.ok((await response.text()).includes('Store category not found'));
}
assert.equal((await fetch(base + '/not-an-existing-page')).status, 404);
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
assert.equal((sitemap.match(/<url>/g) || []).length, 11);
assert.ok(!sitemap.includes('/gallery'));
const robots = await (await fetch(base + '/robots.txt')).text();
assert.ok(robots.includes('Disallow: /api/') && robots.includes('https://arschiscomputers.in/sitemap.xml'));
const reviewsResponse = await fetch(base + '/api/reviews');
const reviews = await reviewsResponse.json();
assert.ok([200, 502, 503].includes(reviewsResponse.status));
assert.ok(Array.isArray(reviews.reviews));
await mkdir('.qa', { recursive: true });
await writeFile('.qa/route-results.json', JSON.stringify({ pages: results, sitemapUrls: 11, unknownRoute: 404, reviewsStatus: reviewsResponse.status, reviewsCount: reviews.reviews.length }, null, 2));
console.log('PASS: 12 page routes retain baseline titles, descriptions, canonicals and structured data.');
console.log('PASS: category fallbacks, 404, sitemap, robots and Reviews response shape. Reviews HTTP ' + reviewsResponse.status + '.');
