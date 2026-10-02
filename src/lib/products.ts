import { createClient } from '@sanity/client';
import { getWhatsAppUrl } from '$lib/contact';

export interface Product {
	_id: string;
	name?: string;
	category?: string;
	specs?: string;
	image?: string;
}

export const productCategories = ['All', 'Branded Desktops', 'PC Cabinets', 'PC Components'];

export const productClient = createClient({
	projectId: 'aetlx2e6',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2024-01-01'
});

export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc){
	_id, name, category, specs, "image": image.asset->url
}`;

export const featuredProductsQuery = `*[_type == "product"] | order(_createdAt desc)[0...4]{
	_id, name, category, specs, "image": image.asset->url
}`;

export function getProductQuoteUrl(productName?: string) {
	return getWhatsAppUrl(
		`Hi Arschis Computers, I am interested in the ${productName || 'product'}. Could you share the price and availability?`
	);
}

export function formatProductSpecs(specs = '') {
	return specs.split(/\||,/).map((spec) => spec.trim()).filter(Boolean);
}
