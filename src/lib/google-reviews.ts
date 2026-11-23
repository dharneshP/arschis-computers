export interface GoogleReview {
	author_name: string;
	profile_photo_url?: string;
	author_uri?: string;
	rating: number;
	text: string;
	time?: number;
	publishTime?: string;
	relativePublishTimeDescription?: string;
}

export interface GoogleReviewData {
	reviews: GoogleReview[];
	rating?: number;
	userRatingsTotal?: number;
	googleMapsUrl?: string;
	googleAttribution?: string;
}

export type GoogleReviewLoadStatus = 'success' | 'empty' | 'error';

export interface GoogleReviewResult extends GoogleReviewData {
	status: GoogleReviewLoadStatus;
}

let reviewRequest: Promise<GoogleReviewResult> | undefined;
let cachedResult: GoogleReviewResult | undefined;
let cachedUntil = 0;

export function getGoogleReviewData() {
	if (cachedResult && Date.now() < cachedUntil) return Promise.resolve(cachedResult);
	if (reviewRequest) return reviewRequest;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 9500);

	const request = fetch('/api/reviews?v=2', { signal: controller.signal })
		.then(async (response) => {
			if (!response.ok) throw new Error('Google review request failed');
			const payload: unknown = await response.json();

			if (Array.isArray(payload)) {
				return {
					reviews: payload as GoogleReview[],
					status: payload.length ? 'success' : 'empty'
				} satisfies GoogleReviewResult;
			}
			if (payload && typeof payload === 'object' && Array.isArray((payload as GoogleReviewData).reviews)) {
				const data = payload as GoogleReviewData;
				return {
					...data,
					status: data.reviews.length ? 'success' : 'empty'
				} satisfies GoogleReviewResult;
			}

			return { reviews: [], status: 'empty' } satisfies GoogleReviewResult;
		})
		.catch(() => ({ reviews: [], status: 'error' }) satisfies GoogleReviewResult)
		.then((result) => {
			if (result.status !== 'error') { cachedResult = result; cachedUntil = Date.now() + 120000; }
			return result;
		})
		.finally(() => {
			clearTimeout(timeout);
			if (reviewRequest === request) reviewRequest = undefined;
		});

	reviewRequest = request;

	return reviewRequest;
}
