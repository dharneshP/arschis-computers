import { writable } from 'svelte/store';

// This is a global switch that any button can turn on/off
export const isBookingOpen = writable(false);