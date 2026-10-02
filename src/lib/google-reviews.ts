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

let reviewRequest: Promise<GoogleReviewData> | undefined;

export function getGoogleReviewData() {
	reviewRequest ??= fetch('/api/reviews')
		.then(async (response) => {
			if (!response.ok) throw new Error('Google review request failed');
			return response.json() as Promise<GoogleReviewData>;
		})
		.catch(() => ({ reviews: [] }));

	return reviewRequest;
}
