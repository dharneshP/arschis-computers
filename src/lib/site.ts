import { businessPhone } from '$lib/contact';

export const site = {
	name: 'Arschis Computers',
	url: 'https://arschiscomputers.in',
	logoUrl: 'https://arschiscomputers.in/logo.png',
	phone: businessPhone,
	email: 'arschiscomputers@gmail.com',
	address: {
		streetAddress: '8, NSTV Building, Brough Road, Fort',
		addressLocality: 'Erode',
		addressRegion: 'Tamil Nadu',
		postalCode: '638001',
		addressCountry: 'IN'
	},
	openingHours: {
		opens: '10:00',
		closes: '21:00'
	}
} as const;

export const serviceNames = [
	'Laptop & PC Service',
	'Computer Sales',
	'Printer Sales & Service',
	'Networking',
	'IT Support & AMC'
] as const;
