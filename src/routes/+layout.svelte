<script lang="ts">
    import '../app.css';
    import BookingModal from '$lib/components/BookingModal.svelte'; 
    import Header from '$lib/components/Header.svelte'; 
    import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';
    import MobileStickyBar from '$lib/components/MobileStickyBar.svelte';

    let { children } = $props();
</script>

<!-- Global Header -->
<Header />

<!-- Leave room for the mobile-only contact bar, including device safe areas. -->
<div class="pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
    {@render children()}
</div>

<!-- Global Modal -->
<BookingModal />
<FloatingWhatsApp />
<MobileStickyBar />
