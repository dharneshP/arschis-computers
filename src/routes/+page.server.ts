import { featuredProductsQuery } from '$lib/products';
import { loadProducts } from '$lib/server/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	productData: await loadProducts(featuredProductsQuery)
});
