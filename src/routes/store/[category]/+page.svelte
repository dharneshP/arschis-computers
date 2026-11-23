<script lang="ts">
    import { normalizeProductValue, productConditions } from '$lib/products';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import ContactActions from '$lib/components/ContactActions.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();
    let activeCondition = $state('All');
    const category = $derived(data.category);
    const products = $derived(category ? data.productData.products.filter((product) => category.matches.some((value) => normalizeProductValue(value) === normalizeProductValue(product.category))) : []);
    const filteredProducts = $derived(activeCondition === 'All' ? products : products.filter((product) => normalizeProductValue(product.condition) === normalizeProductValue(activeCondition)));
    const conditionOptions = ['All', ...productConditions];
    const breadcrumbGraph = $derived(category ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arschiscomputers.in/' },
        { '@type': 'ListItem', position: 2, name: 'Store', item: 'https://arschiscomputers.in/store/' },
        { '@type': 'ListItem', position: 3, name: category.label, item: 'https://arschiscomputers.in/store/' + category.slug + '/' }
    ] } : null);
</script>
<svelte:head>{@html '<script type="application/ld+json">' + JSON.stringify(breadcrumbGraph).replace(/</g, '\\u003c') + '</script>'}</svelte:head>
{#if category}
    <Seo title={category.title} description={category.description} path={'/store/' + category.slug + '/'} />
    <main class="min-w-0 bg-brand-neutral py-section"><div class="site-container">
        <nav aria-label="Breadcrumb" class="mb-6 break-words text-sm text-slate-600"><a href="/" class="hover:text-brand-blue">Home</a><span class="mx-2" aria-hidden="true">›</span><a href="/store/" class="hover:text-brand-blue">Store</a><span class="mx-2" aria-hidden="true">›</span><span aria-current="page">{category.label}</span></nav>
        <header class="max-w-3xl"><h1 class="text-display font-bold tracking-tight wrap-anywhere text-brand-navy">{category.label} for Sale in Erode</h1><p class="mt-4 text-base text-slate-600 sm:text-lg">{category.intro}</p></header>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><label for="condition-filter" class="font-bold text-brand-navy">Filter by condition</label><select id="condition-filter" bind:value={activeCondition} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 sm:w-auto">{#each conditionOptions as condition}<option value={condition}>{condition}</option>{/each}</select></div>
        <p class="mt-5 text-sm text-brand-muted" role="status">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</p>
        {#if data.productData.status === 'success' && filteredProducts.length}
            <div class="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">{#each filteredProducts as product (product._id)}<ProductCard {product} />{/each}</div>
        {:else}
            <div class="mt-8 rounded-card border border-brand-border bg-white p-6 text-center sm:p-8">
                <h2 class="text-2xl font-bold text-brand-navy">{data.productData.status === 'error' ? 'Products are temporarily unavailable online' : data.productData.status === 'success' && products.length ? 'No products match this condition' : 'Current ' + category.label.toLowerCase() + ' stock is being updated'}</h2>
                <p class="mt-3 text-brand-muted">Contact Arschis Computers for current availability.</p>
                <ContactActions class="mt-5 justify-center" />
            </div>
        {/if}
        <div class="mt-12 flex flex-col gap-3 sm:flex-row"><a href="/store/" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-brand-navy px-5 font-bold text-brand-navy">View All Products</a>{#if category.label === 'Laptops'}<a href="/laptop-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-blue px-5 font-bold text-white">Laptop Service</a>{:else if category.label === 'Desktop Computers'}<a href="/computer-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-blue px-5 font-bold text-white">Computer Service</a>{:else if category.label === 'Printers'}<a href="/printer-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-blue px-5 font-bold text-white">Printer Service</a>{/if}</div>
    </div></main>
{:else}
    <Seo title="Store Category Not Found | Arschis Computers" description="Browse computer products from Arschis Computers in Erode." path="/store/" noindex />
    <main class="px-4 py-16 text-center"><h1 class="text-3xl font-bold text-brand-navy">Store category not found</h1><a href="/store/" class="mt-6 inline-flex rounded-lg bg-brand-blue px-5 py-3 font-bold text-white">View Store</a></main>
{/if}
