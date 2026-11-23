<script lang="ts">
    import '../app.css';
    import BookingModal from '$lib/components/BookingModal.svelte';
    import Header from '$lib/components/Header.svelte';
    import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
    import MobileStickyBar from '$lib/components/MobileStickyBar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { afterNavigate } from '$app/navigation';
    import { isBookingOpen } from '$lib/store';

    let { children } = $props();
    afterNavigate(() => { $isBookingOpen = false; });
</script>

<!-- Global Header -->
<a class="skip-link" href="#page-content">Skip to content</a>
<Header />

<!-- Leave room for the mobile-only contact bar, including device safe areas. -->
<div class="min-w-0 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
    <div id="page-content" tabindex="-1" class="min-w-0 focus:outline-none">{@render children()}</div>
    <Footer />
</div>

<!-- Global Modal -->
<BookingModal />
<FloatingWhatsApp />
<MobileStickyBar />
