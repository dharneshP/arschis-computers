<script lang="ts">
    import Gallery from '$lib/components/Gallery.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
    title="Our Work | Arschis Computers"
    description="The Arschis Computers gallery will feature genuine computer service, networking and CCTV project photos from Erode."
    path="/gallery"
    noindex={true}
/>

<!-- The opening tag must be here -->
<main class="min-h-screen bg-white">
    <Gallery />
</main>
<Footer />
