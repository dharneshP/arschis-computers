import { json, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const CACHE_TTL = 60 * 60 * 24;

export async function GET({ setHeaders, url }: RequestEvent) {
	const placeId = env.GOOGLE_PLACE_ID;
	const apiKey = env.GOOGLE_API_KEY;
	const cache = (globalThis as typeof globalThis & { caches?: { default: Cache } }).caches?.default;
	const cacheKey = new Request(`${url.origin}/api/reviews`, { method: 'GET' });

	if (!placeId || !apiKey) {
		setHeaders({ 'Cache-Control': 'no-store' });
		return json({ reviews: [], error: 'Google Reviews configuration unavailable' }, { status: 503 });
	}

	if (cache) {
		const cached = await cache.match(cacheKey);
		if (cached) return new Response(cached.body, cached);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);
	try {
		const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
			signal: controller.signal,
			headers: {
				'X-Goog-Api-Key': apiKey,
				'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsLinks'
			}
		});
		const data = await response.json();
		if (!response.ok) throw new Error(data.error?.message || 'Google Reviews service unavailable');

		const reviews = (Array.isArray(data.reviews) ? data.reviews : [])
			.sort((a: { publishTime?: string }, b: { publishTime?: string }) =>
				Date.parse(b.publishTime || '') - Date.parse(a.publishTime || '')
			)
			.map((review: Record<string, unknown>) => {
				const author = (review.authorAttribution || {}) as Record<string, string>;
				const text = typeof review.text === 'object' ? (review.text as Record<string, string>).text : String(review.text || '');
				return {
					author_name: author.displayName || 'Google reviewer',
					profile_photo_url: author.photoUri || null,
					author_uri: author.uri || null,
					rating: Number(review.rating) || 0,
					text,
					publishTime: review.publishTime || null,
					relativePublishTimeDescription: review.relativePublishTimeDescription || null
				};
			});

		const payload = {
			reviews,
			rating: data.rating ?? null,
			userRatingsTotal: data.userRatingCount ?? null,
			googleMapsUrl: data.googleMapsLinks?.reviewsUri || data.googleMapsLinks?.placeUri || null,
			googleAttribution: 'Google'
		};
		const result = json(payload, { headers: { 'Cache-Control': `public, max-age=${CACHE_TTL}` } });
		if (cache) await cache.put(cacheKey, result.clone());
		setHeaders({ 'Cache-Control': `public, max-age=${CACHE_TTL}` });
		return result;
	} catch (error) {
		const cached = cache ? await cache.match(cacheKey) : undefined;
		if (cached) return new Response(cached.body, cached);
		console.error('Google Reviews request failed', error);
		setHeaders({ 'Cache-Control': 'no-store' });
		return json({ reviews: [], error: 'Google Reviews service unavailable' }, { status: 502 });
	} finally {
		clearTimeout(timeout);
	}
}
