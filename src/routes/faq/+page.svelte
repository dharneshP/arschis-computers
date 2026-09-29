<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import FAQ from '$lib/components/FAQ.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Frequently Asked Questions | Arschis Computers</title>
</svelte:head>

<Header />
<main class="min-h-screen bg-slate-50 pt-20">
    <FAQ />
</main>
<Footer />