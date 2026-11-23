import { businessPhone } from '$lib/contact';

export const site = {
	name: 'Arschis Computers',
	url: 'https://arschiscomputers.in',
	logoUrl: 'https://arschiscomputers.in/logo.png',
	phone: businessPhone,
	proprietor: 'P. Vasanthakumar B.Sc., DECE.',
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

export const businessAddress = `${site.address.streetAddress}, ${site.address.addressLocality} - ${site.address.postalCode}`;
function formatTime(value: string) {
	const [hour, minute] = value.split(':').map(Number);
	return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
}
export const businessHoursLabel = `${formatTime(site.openingHours.opens)} - ${formatTime(site.openingHours.closes)}`;

export const serviceNames = [
	'Laptop & PC Service',
	'Computer Sales',
	'Printer Sales & Service',
	'Networking',
	'IT Support & AMC'
] as const;
