export const businessPhone = '+919944252527';
export const secondaryBusinessPhone = '+919543433464';
export const whatsappNumber = '919944252527';

export const phoneUrl = `tel:${businessPhone}`;
export const secondaryPhoneUrl = `tel:${secondaryBusinessPhone}`;

export const defaultWhatsAppMessage =
	'Hi Arschis Computers, I need help with my device. Can I book a service?';

export function getWhatsAppUrl(message = defaultWhatsAppMessage) {
	return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
