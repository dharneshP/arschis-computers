import { json, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ setHeaders }: RequestEvent) {
	const PLACE_ID = env.GOOGLE_PLACE_ID;
	const API_KEY = env.GOOGLE_API_KEY;

	if (!PLACE_ID || !API_KEY) {
		console.error('Google Reviews: required environment variables are missing', {
			hasPlaceId: Boolean(PLACE_ID),
			hasApiKey: Boolean(API_KEY)
		});

		setHeaders({ 'Cache-Control': 'no-store' });

		return json(
			{
				reviews: [],
				error: 'Google Reviews configuration unavailable'
			},
			{ status: 503 }
		);
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);

	try {
		const url =
			`https://maps.googleapis.com/maps/api/place/details/json` +
			`?place_id=${encodeURIComponent(PLACE_ID)}` +
			`&fields=rating,user_ratings_total,url,reviews` +
			`&key=${encodeURIComponent(API_KEY)}`;

		const res = await fetch(url, {
			signal: controller.signal
		});

		const data = await res.json();

		if (!res.ok || data.status !== 'OK') {
			console.error('Google Reviews upstream request failed', {
				httpStatus: res.status,
				googleStatus: data.status,
				googleErrorMessage: data.error_message
			});

			setHeaders({ 'Cache-Control': 'no-store' });

			return json(
				{
					reviews: [],
					error: 'Google Reviews service unavailable',
					googleStatus: data.status ?? 'UNKNOWN'
				},
				{ status: 502 }
			);
		}

		const reviews = Array.isArray(data.result?.reviews)
			? data.result.reviews
			: [];

		console.info('Google Reviews request succeeded', {
			reviewCount: reviews.length,
			hasRating: typeof data.result?.rating === 'number'
		});

		setHeaders({
			'Cache-Control':
				'public, s-maxage=3600, stale-while-revalidate=86400'
		});

		return json({
			reviews,
			rating: data.result?.rating ?? null,
			userRatingsTotal: data.result?.user_ratings_total ?? null,
			googleMapsUrl: data.result?.url ?? null
		});
	} catch (err) {
		const isAbort =
			err instanceof Error && err.name === 'AbortError';

		console.error('Google Reviews request exception', {
			type: isAbort ? 'timeout' : 'request-error',
			message: err instanceof Error ? err.message : 'Unknown error'
		});

		setHeaders({ 'Cache-Control': 'no-store' });

		return json(
			{
				reviews: [],
				error: isAbort
					? 'Google Reviews request timed out'
					: 'Google Reviews service unavailable'
			},
			{ status: 500 }
		);
	} finally {
		clearTimeout(timeout);
	}
}