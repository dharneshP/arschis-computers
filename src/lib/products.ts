import { getWhatsAppUrl } from '$lib/contact';

export interface Product {
	_id: string;
	name?: string;
	category?: string;
	condition?: string;
	specs?: string;
	image?: string;
}

export type ProductLoadStatus = 'success' | 'empty' | 'error';

export interface ProductLoadResult {
	products: Product[];
	status: ProductLoadStatus;
}

export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc){
	_id, name, category, condition, specs, "image": image.asset->url
}`;

export const featuredProductsQuery = `*[_type == "product"] | order(_createdAt desc)[0...4]{
	_id, name, category, condition, specs, "image": image.asset->url
}`;

export function getProductQuoteUrl(productName?: string) {
	return getWhatsAppUrl(
		`Hi Arschis Computers, I am interested in the ${productName || 'product'}. Could you share the price and availability?`
	);
}

export function getOptimizedProductImage(imageUrl: string | undefined, width: number) {
	if (!imageUrl) return '/logo-header.png';

	let url: URL;
	try { url = new URL(imageUrl); } catch { return '/logo-header.png'; }
	if (!['https:', 'http:'].includes(url.protocol)) return '/logo-header.png';
	url.searchParams.set('w', String(width));
	url.searchParams.set('fit', 'max');
	url.searchParams.set('auto', 'format');
	return url.href;
}

export function getProductImageSrcset(imageUrl: string | undefined) {
	if (!imageUrl) return undefined;
	if (getOptimizedProductImage(imageUrl, 160) === '/logo-header.png') return undefined;
	return [160, 240, 320, 480, 640, 960].map((width) => getOptimizedProductImage(imageUrl, width) + ' ' + width + 'w').join(', ');
}

export function formatProductSpecs(specs = '') {
	return specs.split(/\||,/).map((spec) => spec.trim()).filter(Boolean);
}

/** Compare CMS values consistently without changing stored content. */
export function normalizeProductValue(value?: string) {
	return value?.trim().replace(/\s+/g, ' ').toLowerCase() || '';
}

export const productConditions = ['New', 'Used', 'Refurbished'] as const;
export function getConditionLabel(value?: string) {
	return productConditions.find((condition) => normalizeProductValue(condition) === normalizeProductValue(value))
		|| value?.trim() || 'Condition to confirm';
}

export function getProductCategories(products: Product[]) {
	const labels = new Map<string, string>();
	for (const product of products) {
		const key = normalizeProductValue(product.category);
		if (key && !labels.has(key)) labels.set(key, product.category!.trim().replace(/\s+/g, ' '));
	}
	return [...labels.values()].sort((a, b) => a.localeCompare(b));
}
