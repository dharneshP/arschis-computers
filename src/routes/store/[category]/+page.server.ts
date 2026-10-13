import { allProductsQuery } from '$lib/products';
import { loadProducts } from '$lib/server/products';
import { storeCategories, type StoreCategorySlug } from '$lib/store-categories';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const category = storeCategories[params.category as StoreCategorySlug];
	return { category: category ? { ...category, slug: params.category } : null, productData: category ? await loadProducts(allProductsQuery) : { products: [], status: 'error' as const } };
};
