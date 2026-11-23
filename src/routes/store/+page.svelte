<script lang="ts">
    import { getProductCategories, normalizeProductValue, productConditions } from '$lib/products';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import Dialog from '$lib/components/ui/Dialog.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    import type { PageProps } from './$types';
    import { page } from '$app/state';
    import { afterNavigate } from '$app/navigation';

    let { data }: PageProps = $props();
    let activeCategory = $state('All');
    let activeCondition = $state('All');
    let searchTerm = $state(page.url.searchParams.get('q') || '');
    afterNavigate(() => { searchTerm = page.url.searchParams.get('q') || ''; });
    let filtersOpen = $state(false);
    let draftCategory = $state('All');
    let draftCondition = $state('All');

    const products = $derived(data.productData.products);
    const categories = $derived(['All', ...getProductCategories(products)]);
    const conditions = ['All', ...productConditions];
    const normalize = normalizeProductValue;

    let filteredProducts = $derived(
        products.filter((product) =>
            (activeCategory === 'All' || normalize(product.category) === normalize(activeCategory)) &&
            (activeCondition === 'All' || normalize(product.condition) === activeCondition.toLowerCase()) &&
            ((product.name || '').toLowerCase().includes(searchTerm.trim().toLowerCase()))
        )
    );

    const hasActiveFilters = $derived(activeCategory !== 'All' || activeCondition !== 'All' || searchTerm.trim().length > 0);
    const categoryCount = (category: string) => category === 'All' ? products.length : products.filter((product) => normalize(product.category) === normalize(category)).length;
    const conditionCount = (condition: string) => condition === 'All' ? products.length : products.filter((product) => normalize(product.condition) === condition.toLowerCase()).length;
    function openFilters() { draftCategory = activeCategory; draftCondition = activeCondition; filtersOpen = true; }
    function applyFilters() { activeCategory = draftCategory; activeCondition = draftCondition; filtersOpen = false; }
    function clearFilters() { activeCategory = 'All'; activeCondition = 'All'; searchTerm = ''; draftCategory = 'All'; draftCondition = 'All'; filtersOpen = false; }

</script>

<Seo
    title="Computer Store in Erode | Arschis Computers"
    description="Browse current computer products from Arschis Computers in Erode, including laptops, desktops, printers and monitors, with direct quote enquiries."
    path="/store"
/>

<main class="min-h-screen bg-brand-neutral py-section">
    <div class="site-container">

        <div class="text-center mb-7 sm:mb-12">
                <h1 class="mb-4 text-display font-bold tracking-tight text-brand-navy">Computer Store in Erode</h1>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse current laptops, desktops, printers and monitors from Arschis Computers. Product condition and availability depend on current stock.
            </p>
            <nav aria-label="Product categories" class="mt-5 flex flex-wrap justify-center gap-2 text-sm font-bold"><a class="rounded-full border border-slate-300 px-3 py-2 text-brand-navy" href="/store/laptops/">Laptops</a><a class="rounded-full border border-slate-300 px-3 py-2 text-brand-navy" href="/store/desktops/">Desktop Computers</a><a class="rounded-full border border-slate-300 px-3 py-2 text-brand-navy" href="/store/printers/">Printers</a><a class="rounded-full border border-slate-300 px-3 py-2 text-brand-navy" href="/store/monitors/">Monitors</a></nav>
        </div>

        <div class="mb-10 space-y-4">
            <div class="mx-auto flex max-w-3xl gap-3">
                <label class="sr-only" for="product-search">Search Products</label>
                <input id="product-search" bind:value={searchTerm} placeholder="Search Products" class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20" />
                <button type="button" onclick={openFilters} aria-haspopup="dialog" class="min-h-[52px] rounded-xl bg-brand-navy px-4 font-bold text-white shadow-sm hover:bg-brand-blue-dark lg:hidden">Filters</button>
            </div>
            <div class="hidden flex-wrap justify-center gap-3 lg:flex {categories.length > 7 ? 'lg:hidden' : ''}">
                {#each categories as category}
                    <button type="button" onclick={() => activeCategory = category} aria-pressed={activeCategory === category}
                    class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-sm
                    {activeCategory === category
                        ? 'bg-brand-navy text-white ring-2 ring-brand-navy ring-offset-2 ring-offset-slate-50'
                        : 'bg-white text-slate-600 hover:text-brand-navy hover:bg-slate-100 border border-slate-200'}"
                >{category} <span class="ml-1 text-xs opacity-70">{categoryCount(category)}</span></button>
                {/each}
            </div>
            {#if categories.length > 7}
                <div class="hidden items-center justify-center gap-3 lg:flex">
                    <label for="category-select" class="font-bold text-brand-navy">Categories</label>
                    <select id="category-select" bind:value={activeCategory} class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm">{#each categories as category}<option value={category}>{category} ({categoryCount(category)})</option>{/each}</select>
                </div>
            {/if}
            <div class="hidden flex-wrap justify-center gap-2 lg:flex">
                {#each conditions as condition}<button type="button" onclick={() => activeCondition = condition} aria-pressed={activeCondition === condition} class="rounded-full border px-4 py-2 text-sm font-bold {activeCondition === condition ? 'border-brand-navy bg-brand-navy text-white' : 'border-slate-200 bg-white text-slate-600'}">{condition} <span class="opacity-70">{conditionCount(condition)}</span></button>{/each}
            </div>
            {#if hasActiveFilters}<div class="flex flex-wrap items-center justify-center gap-2 text-sm"><span class="font-semibold text-slate-500">Active:</span>{#if activeCategory !== 'All'}<button type="button" onclick={() => activeCategory = 'All'} class="rounded-full bg-slate-200 px-3 py-1 font-semibold">{activeCategory} ×</button>{/if}{#if activeCondition !== 'All'}<button type="button" onclick={() => activeCondition = 'All'} class="rounded-full bg-slate-200 px-3 py-1 font-semibold">{activeCondition} ×</button>{/if}{#if searchTerm}<button type="button" onclick={() => searchTerm = ''} class="rounded-full bg-slate-200 px-3 py-1 font-semibold">Search ×</button>{/if}<button type="button" onclick={clearFilters} class="font-bold text-brand-navy underline">Clear Filters</button></div>{/if}
        </div>

        <Dialog open={filtersOpen} onclose={() => filtersOpen = false} title="Store filters" description="Choose a category and condition, then show products.">
            <div class="space-y-5">
                <div><label class="mb-2 block text-sm font-semibold" for="mobile-category">Category</label><select id="mobile-category" bind:value={draftCategory} class="field">{#each categories as category}<option value={category}>{category} ({categoryCount(category)})</option>{/each}</select></div>
                <div><label class="mb-2 block text-sm font-semibold" for="mobile-condition">Condition</label><select id="mobile-condition" bind:value={draftCondition} class="field">{#each conditions as condition}<option value={condition}>{condition} ({conditionCount(condition)})</option>{/each}</select></div>
                <div class="flex flex-wrap gap-3"><Button onclick={clearFilters} variant="secondary" class="flex-1">Clear Filters</Button><Button onclick={applyFilters} class="flex-1">Show Products</Button></div>
            </div>
        </Dialog>

        {#if data.productData.status === 'success'}
            <p class="mb-5 text-sm text-brand-muted" role="status">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found</p>
            <div class="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                {#each filteredProducts as product (product._id)}<ProductCard {product} />{/each}
            </div>

            {#if filteredProducts.length === 0}
                <div class="text-center py-20">
                    <i class="fa-solid fa-box-open text-6xl text-slate-300 mb-4"></i>
                    <h2 class="text-2xl font-bold text-brand-navy">No products match these filters</h2>
                    <p class="text-slate-500 mt-2">Contact us for current {activeCategory} availability.</p>
                    <a href={getWhatsAppUrl(`Hi Arschis Computers, please share your current ${activeCategory} availability.`)} target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-whatsapp px-5 py-3 font-bold text-white hover:bg-[#06662D]">
                        <i class="fa-brands fa-whatsapp mr-2" aria-hidden="true"></i> Ask on WhatsApp
                    </a>
                </div>
            {/if}
        {:else}
            <div class="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm" role="status">
                <i class="fa-solid fa-box-open text-5xl text-slate-300" aria-hidden="true"></i>
                <h2 class="mt-4 text-2xl font-bold text-brand-navy">
                    {data.productData.status === 'empty' ? 'Product information is currently being updated' : 'Products are temporarily unavailable online'}
                </h2>
                <p class="mx-auto mt-3 max-w-xl text-slate-600">Contact Arschis Computers for current availability and a direct quote.</p>
                <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href={getWhatsAppUrl('Hi Arschis Computers, please share your current product availability.')} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-whatsapp px-5 py-3 font-bold text-white hover:bg-[#06662D]">
                        <i class="fa-brands fa-whatsapp mr-2" aria-hidden="true"></i> WhatsApp
                    </a>
                    <a href={phoneUrl} class="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-navy px-5 py-3 font-bold text-white hover:bg-brand-navy-dark">
                        <i class="fa-solid fa-phone mr-2" aria-hidden="true"></i> Call Now
                    </a>
                </div>
            </div>
        {/if}
    </div>
</main>
