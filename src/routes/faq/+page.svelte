<script lang="ts">
    import FAQ from '$lib/components/FAQ.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
    title="Computer Service FAQs | Arschis Computers"
    description="Answers to common questions about computer repairs, replacement parts and service times from Arschis Computers."
    path="/faq"
/>

<main class="min-h-screen bg-slate-50">
    <FAQ />
</main>
<Footer />
