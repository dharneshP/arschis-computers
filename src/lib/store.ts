import { writable } from 'svelte/store';
export { isOverlayOpen } from '$lib/overlays';

// This is a global switch that any button can turn on/off
export const isBookingOpen = writable(false);
