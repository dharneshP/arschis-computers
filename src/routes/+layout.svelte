<script lang="ts">
    import '../app.css';
    // 1. Add this import line right here:
    import BookingModal from '$lib/components/BookingModal.svelte'; 

    let { children } = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</svelte:head>

<!-- This renders your actual pages (Home, Store, Gallery, etc.) -->
{@render children()}

<!-- 2. Add this right at the bottom! -->
<BookingModal />