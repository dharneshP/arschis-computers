<script lang="ts">
    import { getOptimizedProductImage, getProductQuoteUrl } from '$lib/products';
    import Seo from '$lib/components/Seo.svelte';
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();
    let activeCondition = $state('All');
    const category = $derived(data.category);
    const products = $derived(category ? data.productData.products.filter((product) => category.matches.includes(product.category as never)) : []);
    const filteredProducts = $derived(activeCondition === 'All' ? products : products.filter((product) => product.condition?.toLowerCase() === activeCondition.toLowerCase()));
    const conditionLabel = (condition?: string) => condition ? condition.charAt(0).toUpperCase() + condition.slice(1).toLowerCase() : '';
    const conditionOptions = ['All', 'New', 'Used', 'Refurbished'];
    const breadcrumbGraph = $derived(category ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://arschiscomputers.in/' },
        { '@type': 'ListItem', position: 2, name: 'Store', item: 'https://arschiscomputers.in/store/' },
        { '@type': 'ListItem', position: 3, name: category.label, item: 'https://arschiscomputers.in/store/' + category.slug + '/' }
    ] } : null);
</script>
<svelte:head>{@html '<script type="application/ld+json">' + JSON.stringify(breadcrumbGraph).replace(/</g, '\\u003c') + '</script>'}</svelte:head>
{#if category}
    <Seo title={category.title} description={category.description} path={'/store/' + category.slug + '/'} />
    <main class="min-w-0 bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8"><div class="mx-auto min-w-0 max-w-7xl">
        <nav aria-label="Breadcrumb" class="mb-6 break-words text-sm text-slate-600"><a href="/" class="hover:text-[#D92323]">Home</a><span class="mx-2" aria-hidden="true">›</span><a href="/store/" class="hover:text-[#D92323]">Store</a><span class="mx-2" aria-hidden="true">›</span><span aria-current="page">{category.label}</span></nav>
        <header class="max-w-3xl"><h1 class="break-words text-3xl font-extrabold text-[#0F284F] sm:text-5xl">{category.label} for Sale in Erode</h1><p class="mt-4 text-base text-slate-600 sm:text-lg">{category.intro}</p></header>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><label for="condition-filter" class="font-bold text-[#0F284F]">Filter by condition</label><select id="condition-filter" bind:value={activeCondition} class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 sm:w-auto">{#each conditionOptions as condition}<option value={condition}>{condition}</option>{/each}</select></div>
        {#if data.productData.status === 'success' && filteredProducts.length}<div class="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{#each filteredProducts as product (product._id)}<article class="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"><div class="flex aspect-[4/3] items-center justify-center bg-slate-100 p-4"><img src={getOptimizedProductImage(product.image, 720)} alt={product.name || category.label + ' product'} width="720" height="540" loading="lazy" decoding="async" class="h-full max-w-full object-contain" /></div><div class="p-5"><p class="text-xs font-bold uppercase tracking-wide text-slate-500">{product.category}</p><h2 class="mt-1 break-words text-lg font-bold text-[#0F284F]">{product.name || 'Product enquiry'}</h2>{#if product.condition}<p class="mt-2 text-sm font-semibold text-slate-600">Condition: {conditionLabel(product.condition)}</p>{/if}{#if product.specs}<p class="mt-2 break-words text-sm text-slate-600">{product.specs}</p>{/if}<a href={getProductQuoteUrl(product.name)} target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#087A35] px-4 py-2 font-bold text-white">Get a Quote</a></div></article>{/each}</div>{:else}<div class="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center"><h2 class="text-2xl font-bold text-[#0F284F]">Current {category.label.toLowerCase()} stock is being updated</h2><p class="mt-2 text-slate-600">Contact Arschis Computers for current availability.</p></div>{/if}
        <div class="mt-12 flex flex-col gap-3 sm:flex-row"><a href="/store/" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#0F284F] px-5 font-bold text-[#0F284F]">View All Products</a>{#if category.label === 'Laptops'}<a href="/laptop-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D92323] px-5 font-bold text-white">Laptop Service</a>{:else if category.label === 'Desktop Computers'}<a href="/computer-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D92323] px-5 font-bold text-white">Computer Service</a>{:else if category.label === 'Printers'}<a href="/printer-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D92323] px-5 font-bold text-white">Printer Service</a>{/if}</div>
    </div></main>
{:else}
    <Seo title="Store Category Not Found | Arschis Computers" description="Browse computer products from Arschis Computers in Erode." path="/store/" noindex />
    <main class="px-4 py-16 text-center"><h1 class="text-3xl font-bold text-[#0F284F]">Store category not found</h1><a href="/store/" class="mt-6 inline-flex rounded-lg bg-[#D92323] px-5 py-3 font-bold text-white">View Store</a></main>
{/if}
