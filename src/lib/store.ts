import { writable } from 'svelte/store';

// This is a global switch that any button can turn on/off
export const isBookingOpen = writable(false);

// This tracks if the header booking button should be visible
export const isHeaderButtonVisible = writable(false);