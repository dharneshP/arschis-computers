export interface GoogleReview {
	author_name: string;
	profile_photo_url?: string;
	rating: number;
	text: string;
	time: number;
}

export interface GoogleReviewData {
	reviews: GoogleReview[];
	rating?: number;
	userRatingsTotal?: number;
	googleMapsUrl?: string;
}

export type GoogleReviewLoadStatus = 'success' | 'empty' | 'error';

export interface GoogleReviewResult extends GoogleReviewData {
	status: GoogleReviewLoadStatus;
}

let reviewRequest: Promise<GoogleReviewResult> | undefined;

export function getGoogleReviewData() {
	if (reviewRequest) return reviewRequest;

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 5500);

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
		.finally(() => {
			clearTimeout(timeout);
			if (reviewRequest === request) reviewRequest = undefined;
		});

	reviewRequest = request;

	return reviewRequest;
}
