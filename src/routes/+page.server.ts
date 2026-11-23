import { featuredProductsQuery } from '$lib/products';
import { loadProducts, loadCategoryImages } from '$lib/server/products';
import type { PageServerLoad } from './$types';
import { recentGalleryQuery } from '$lib/gallery';
import { loadGallery } from '$lib/server/gallery';

export const load: PageServerLoad = async () => {
	const [productData, galleryData, categoryImages] = await Promise.all([
		loadProducts(featuredProductsQuery),
		loadGallery(recentGalleryQuery),
		loadCategoryImages()
	]);

	return { productData, galleryData, categoryImages };
};
