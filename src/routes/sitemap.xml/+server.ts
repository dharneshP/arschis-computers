import { site } from '$lib/site';
import type { RequestHandler } from './$types';

const routes = ['/', '/store', '/faq'];

export const GET: RequestHandler = () => {
	const urls = routes
		.map((path) => `<url><loc>${new URL(path, site.url).href}</loc></url>`)
		.join('');

	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=86400'
		}
	});
};
