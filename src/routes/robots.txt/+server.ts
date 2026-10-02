import { site } from '$lib/site';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const isDevelopmentHost = url.hostname.endsWith('.pages.dev');
	const body = isDevelopmentHost
		? 'User-agent: *\nDisallow: /\n'
		: `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.url}/sitemap.xml\n`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=300'
		}
	});
};
