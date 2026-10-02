import { createClient } from '@sanity/client';
import type { Product, ProductLoadResult } from '$lib/products';

const productClient = createClient({
	projectId: 'aetlx2e6',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2024-01-01'
});

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
