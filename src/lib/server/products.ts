import { createClient } from '@sanity/client';
import type { Product, ProductLoadResult } from '$lib/products';
import type { StoreCategorySlug } from '$lib/store-categories';

const productClient = createClient({
	projectId: 'aetlx2e6',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2024-01-01'
});

/** One real image per category. Bounded results; no CMS writes or invented products. */
export async function loadCategoryImages(): Promise<Partial<Record<StoreCategorySlug, string>>> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 4500);
	try {
		return await productClient.fetch(`{
			"laptops": (*[_type == "product" && category in ["Laptop", "Gaming Laptop", "2-in-1 Laptop"] && defined(image.asset)] | order(_createdAt desc))[0].image.asset->url,
			"desktops": (*[_type == "product" && category == "Desktop" && defined(image.asset)] | order(_createdAt desc))[0].image.asset->url,
			"monitors": (*[_type == "product" && category == "Monitor" && defined(image.asset)] | order(_createdAt desc))[0].image.asset->url,
			"printers": (*[_type == "product" && category == "Printer" && defined(image.asset)] | order(_createdAt desc))[0].image.asset->url
		}`, {}, { signal: controller.signal });
	} catch { return {}; }
	finally { clearTimeout(timeout); }
}

export async function loadProducts(query: string, timeoutMs = 4500): Promise<ProductLoadResult> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const products = await productClient.fetch<Product[]>(query, {}, { signal: controller.signal });
		return {
			products,
			status: products.length ? 'success' : 'empty'
		};
	} catch {
		return { products: [], status: 'error' };
	} finally {
		clearTimeout(timeout);
	}
}
