export const bookingServiceCategories = ['PC / Laptop', 'Printer', 'Network', 'Other'] as const;
export interface BookingFields {
	name: string;
	mobile: string;
	selectedServices: string[];
	problem: string;
	preferredType: string;
}
export type BookingErrors = Partial<Record<'name' | 'mobile' | 'selectedServices' | 'problem', string>>;

export function validateBooking(fields: BookingFields): BookingErrors {
	const errors: BookingErrors = {};
	if (fields.name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
	const mobile = fields.mobile.trim();
	const digits = mobile.replace(/\D/g, '');
	const validFormat = /^\+?[\d ()-]+$/.test(mobile);
	const validLength = digits.length === 10 || (digits.length === 11 && digits.startsWith('0')) ||
		(digits.length === 12 && digits.startsWith('91')) || (mobile.startsWith('+') && digits.length >= 8 && digits.length <= 15);
	if (!validFormat || !validLength) errors.mobile = 'Enter a 10-digit mobile number or an international number with country code.';
	if (!fields.selectedServices.some((service) => bookingServiceCategories.includes(service as typeof bookingServiceCategories[number]))) {
		errors.selectedServices = 'Select at least one service category.';
	}
	if (fields.problem.trim().length < 5) errors.problem = 'Describe the issue in at least 5 characters.';
	return errors;
}

export function createBookingMessage(fields: BookingFields) {
	return `Hi Arschis Computers,

I would like to book a service.

*Name:* ${fields.name.trim()}
*Mobile:* ${fields.mobile.trim()}
*Services:* ${fields.selectedServices.join(', ')}
*Problem:* ${fields.problem.trim()}
*Preferred Service:* ${fields.preferredType}`;
}
