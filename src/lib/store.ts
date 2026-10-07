import { writable, derived } from 'svelte/store';

// This is a global switch that any button can turn on/off
export const isBookingOpen = writable(false);

// This tracks if the header booking button should be visible
export const isHeaderButtonVisible = writable(false);
export const overlayCount = writable(0);
export const isOverlayOpen = derived(overlayCount, (count) => count > 0);
