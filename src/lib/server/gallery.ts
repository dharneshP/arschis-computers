import {createClient} from '@sanity/client';
import type {GalleryItem, GalleryLoadResult} from '$lib/gallery';

const galleryClient = createClient({
	projectId: 'aetlx2e6',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2024-01-01'
});

export async function loadGallery(query: string, timeoutMs = 4500): Promise<GalleryLoadResult> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		const items = await galleryClient.fetch<GalleryItem[]>(query, {}, {signal: controller.signal});
		return {items, status: items.length ? 'success' : 'empty'};
	} catch {
		return {items: [], status: 'error'};
	} finally {
		clearTimeout(timeout);
	}
}
