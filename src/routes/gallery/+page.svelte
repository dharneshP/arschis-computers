<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Gallery from '$lib/components/Gallery.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Work Gallery | Arschis Computers</title>
</svelte:head>

<Header />
<main class="min-h-screen bg-white pt-20">
    <Gallery />
</main>
<Footer />