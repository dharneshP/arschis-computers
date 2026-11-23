// Imported only by local browser QA. These fixtures never write to Sanity.
import { mount, unmount } from 'svelte';
import Gallery from '../components/Gallery.svelte';
import StorePage from '../../routes/store/+page.svelte';
import OurWorkPreview from '../components/OurWorkPreview.svelte';
import type { Product } from '../products';

export const fixtureProducts: Product[] = [
	{ _id: 'qa-new', name: 'QA Laptop New', category: ' Laptop ', condition: ' new ', specs: 'Intel i5 | 16GB RAM | 512GB SSD' },
	{ _id: 'qa-used', name: 'QA Laptop Used', category: 'laptop', condition: 'USED', specs: 'Intel i3, 8GB RAM' },
	{ _id: 'qa-refurb', name: 'QA Printer Refurbished', category: ' Printer ', condition: ' Refurbished ', specs: 'Wi-Fi | Colour printing' },
	{ _id: 'qa-long', name: 'QA' + 'LongProductName'.repeat(8), category: 'Processor & Motherboard Combo', condition: 'Used', specs: 'LongSpecification'.repeat(12), image: 'invalid' }
];
let component: ReturnType<typeof mount> | undefined;
let target: HTMLElement | undefined;
export async function cleanup() {
	if (component) await unmount(component);
	target?.remove();
	component = undefined;
}
export async function showFixture(kind: 'gallery' | 'store' | 'recent') {
	await cleanup();
	target = document.createElement('div');
	document.getElementById('page-content')!.append(target);
	if (kind === 'store') {
		component = mount(StorePage, { target, props: { params: {}, form: null, data: { productData: { products: fixtureProducts, status: 'success' } } } });
	} else if (kind === 'recent') {
		component = mount(OurWorkPreview, { target, props: { data: { status: 'success', items: [
			{ _id: 'qa-recent', title: 'QA recent project', mediaType: 'image', category: 'Shop', image: { asset: { url: location.origin + '/home-hero-480.jpg' } } }
		] } } });
	} else {
		component = mount(Gallery, { target, props: { data: { status: 'success', items: [
			{ _id: 'qa-image', title: 'QA image', mediaType: 'image', category: 'Shop', image: { asset: { url: location.origin + '/home-hero-480.jpg' } } },
			{ _id: 'qa-video', title: 'QA video', mediaType: 'video', category: 'PC & Laptop', video: 'https://www.youtube.com/watch?v=qa-fixture' }
		] } } });
	}
	return kind;
}
