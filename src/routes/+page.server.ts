import { featuredProductsQuery } from '$lib/products';
import { loadProducts } from '$lib/server/products';
import type { PageServerLoad } from './$types';
import { featuredGalleryQuery } from '$lib/gallery';
import { loadGallery } from '$lib/server/gallery';

export const load: PageServerLoad = async () => ({
	productData: await loadProducts(featuredProductsQuery),
	galleryData: await loadGallery(featuredGalleryQuery)
});
