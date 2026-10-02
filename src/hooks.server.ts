import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (!event.url.hostname.endsWith('.pages.dev')) return response;

	const headers = new Headers(response.headers);
	headers.set('X-Robots-Tag', 'noindex, nofollow');

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};
