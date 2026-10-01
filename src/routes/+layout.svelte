<script lang="ts">
    import '../app.css';
    import BookingModal from '$lib/components/BookingModal.svelte'; 
    import Header from '$lib/components/Header.svelte'; 
    import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';

    let { children } = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<!-- Global Header -->
<Header />

<!-- Renders the Home or Store page content -->
{@render children()}

<!-- Global Modal -->
<BookingModal />
<FloatingWhatsApp />