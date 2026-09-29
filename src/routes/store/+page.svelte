<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import UsedLaptops from '$lib/components/UsedLaptops.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Certified Used Laptops | Arschis Computers</title>
</svelte:head>

<Header />
<main class="min-h-screen bg-slate-50 pt-20">
    <UsedLaptops />
</main>
<Footer />