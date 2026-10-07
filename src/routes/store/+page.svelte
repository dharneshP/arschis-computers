<script lang="ts">
    import {
        formatProductSpecs,
        getProductQuoteUrl,
        getOptimizedProductImage,
    } from '$lib/products';
    import Seo from '$lib/components/Seo.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    import type { PageProps } from './$types';
    import { overlayCount } from '$lib/store';

    let { data }: PageProps = $props();
    let activeCategory = $state('All');
    let activeCondition = $state('All');
    let searchTerm = $state('');
    let filtersOpen = $state(false);
    let draftCategory = $state('All');
    let draftCondition = $state('All');

    const products = $derived(data.productData.products);
    const categories = $derived(['All', ...Array.from(new Set(products.map((product) => product.category?.trim()).filter(Boolean) as string[])).sort((a, b) => a.localeCompare(b))]);
    const conditions = ['All', 'New', 'Used', 'Refurbished'];
    const normalize = (value?: string) => value?.trim().toLowerCase() || '';
    const conditionLabel = (value?: string) => value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';

    let filteredProducts = $derived(
        products.filter((product) =>
            (activeCategory === 'All' || product.category === activeCategory) &&
            (activeCondition === 'All' || normalize(product.condition) === activeCondition.toLowerCase()) &&
            ((product.name || '').toLowerCase().includes(searchTerm.trim().toLowerCase()))
        )
    );

    const hasActiveFilters = $derived(activeCategory !== 'All' || activeCondition !== 'All' || searchTerm.trim().length > 0);
    const categoryCount = (category: string) => category === 'All' ? products.length : products.filter((product) => product.category === category).length;
    const conditionCount = (condition: string) => condition === 'All' ? products.length : products.filter((product) => normalize(product.condition) === condition.toLowerCase()).length;
    function openFilters() { draftCategory = activeCategory; draftCondition = activeCondition; filtersOpen = true; overlayCount.set(1); }
    function applyFilters() { activeCategory = draftCategory; activeCondition = draftCondition; filtersOpen = false; overlayCount.set(0); }
    function clearFilters() { activeCategory = 'All'; activeCondition = 'All'; searchTerm = ''; draftCategory = 'All'; draftCondition = 'All'; filtersOpen = false; overlayCount.set(0); }
    $effect(() => { if (!filtersOpen) overlayCount.set(0); });

</script>

<Seo
    title="Computer Products | Arschis Computers"
    description="Explore desktops, PC cabinets and computer components available from Arschis Computers in Erode, with direct quote enquiries."
    path="/store"
/>

<main class="min-h-screen bg-slate-50 py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-7 sm:mb-12">
                <h1 class="text-4xl md:text-5xl font-extrabold text-[#0F284F] mb-4">Our Store</h1>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse our premium selection of branded desktops, high-airflow gaming cabinets, and core components. Tap 'Enquire' to get an instant quote via WhatsApp.
            </p>
        </div>

        <div class="mb-10 space-y-4">
            <div class="mx-auto flex max-w-3xl gap-3">
                <label class="sr-only" for="product-search">Search Products</label>
                <input id="product-search" bind:value={searchTerm} placeholder="Search Products" class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm focus:border-[#0F284F] focus:outline-none focus:ring-2 focus:ring-[#0F284F]/20" />
                <button type="button" onclick={openFilters} class="min-h-[52px] rounded-xl bg-[#0F284F] px-4 font-bold text-white shadow-sm hover:bg-[#173b70] lg:hidden">Filters</button>
            </div>
            <div class="hidden justify-center gap-3 lg:flex {categories.length > 7 ? 'lg:hidden' : ''}">
                {#each categories as category}
                    <button type="button" onclick={() => activeCategory = category} aria-pressed={activeCategory === category}
                    class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-sm 
                    {activeCategory === category 
                        ? 'bg-[#0F284F] text-white ring-2 ring-[#0F284F] ring-offset-2 ring-offset-slate-50' 
                        : 'bg-white text-slate-600 hover:text-[#0F284F] hover:bg-slate-100 border border-slate-200'}"
                >{category} <span class="ml-1 text-xs opacity-70">{categoryCount(category)}</span></button>
                {/each}
            </div>
            {#if categories.length > 7}
                <div class="hidden items-center justify-center gap-3 lg:flex">
                    <label for="category-select" class="font-bold text-[#0F284F]">Categories</label>
                    <select id="category-select" bind:value={activeCategory} class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 shadow-sm">{#each categories as category}<option value={category}>{category} ({categoryCount(category)})</option>{/each}</select>
                </div>
            {/if}
            <div class="hidden justify-center gap-2 lg:flex">
                {#each conditions as condition}<button type="button" onclick={() => activeCondition = condition} class="rounded-full border px-4 py-2 text-sm font-bold {activeCondition === condition ? 'border-[#0F284F] bg-[#0F284F] text-white' : 'border-slate-200 bg-white text-slate-600'}">{condition} <span class="opacity-70">{conditionCount(condition)}</span></button>{/each}
            </div>
            {#if hasActiveFilters}<div class="flex flex-wrap items-center justify-center gap-2 text-sm"><span class="font-semibold text-slate-500">Active:</span>{#if activeCategory !== 'All'}<button type="button" onclick={() => activeCategory = 'All'} class="rounded-full bg-slate-200 px-3 py-1 font-semibold">{activeCategory} ×</button>{/if}{#if activeCondition !== 'All'}<button type="button" onclick={() => activeCondition = 'All'} class="rounded-full bg-slate-200 px-3 py-1 font-semibold">{activeCondition} ×</button>{/if}{#if searchTerm}<button type="button" onclick={() => searchTerm = ''} class="rounded-full bg-slate-200 px-3 py-1 font-semibold">Search ×</button>{/if}<button type="button" onclick={clearFilters} class="font-bold text-[#0F284F] underline">Clear Filters</button></div>{/if}
        </div>

        {#if filtersOpen}<div class="fixed inset-0 z-50 flex items-end bg-slate-900/50 lg:hidden" role="presentation" onclick={(event) => event.target === event.currentTarget && (filtersOpen = false)}><div class="w-full rounded-t-3xl bg-white p-6" role="dialog" aria-modal="true" aria-label="Store filters" tabindex="-1"><div class="mb-5 flex items-center justify-between"><h2 class="text-xl font-bold text-[#0F284F]">Filters</h2><button type="button" onclick={() => filtersOpen = false} aria-label="Close filters" class="text-2xl text-slate-500">×</button></div><label class="mb-2 block font-bold text-[#0F284F]" for="mobile-category">Category</label><select id="mobile-category" bind:value={draftCategory} class="mb-5 w-full rounded-xl border border-slate-200 px-4 py-3">{#each categories as category}<option value={category}>{category} ({categoryCount(category)})</option>{/each}</select><label class="mb-2 block font-bold text-[#0F284F]" for="mobile-condition">Condition</label><select id="mobile-condition" bind:value={draftCondition} class="mb-6 w-full rounded-xl border border-slate-200 px-4 py-3">{#each conditions as condition}<option value={condition}>{condition} ({conditionCount(condition)})</option>{/each}</select><div class="flex gap-3"><button type="button" onclick={clearFilters} class="flex-1 rounded-xl border border-slate-200 py-3 font-bold text-slate-700">Clear Filters</button><button type="button" onclick={applyFilters} class="flex-1 rounded-xl bg-[#0F284F] py-3 font-bold text-white">Show Products</button></div></div></div>{/if}

        {#if data.productData.status === 'success'}
            <!-- Product Grid -->
            <div class="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
                {#each filteredProducts as product}
                    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                        
                        <div class="relative flex h-36 items-center justify-center overflow-hidden bg-slate-100 p-2 sm:h-64 sm:p-4">
                            {#if product.condition}<span class="absolute right-4 top-4 z-10 rounded-full bg-[#F4C542] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#0F284F]">{conditionLabel(product.condition)}</span>{/if}
                            <img 
                                src={getOptimizedProductImage(product.image, 720)}
                                srcset={product.image ? `${getOptimizedProductImage(product.image, 480)} 480w, ${getOptimizedProductImage(product.image, 720)} 720w` : undefined}
                                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                                alt={product.name || 'Arschis Computers product'}
                                width="720"
                                height="480"
                                loading="lazy"
                                decoding="async"
                                class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                onerror={(event) => ((event.currentTarget as HTMLImageElement).src = '/logo.png')}
                            />
                        </div>
                        
                        <div class="flex flex-1 flex-col p-3 sm:p-6">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{product.category || 'Uncategorized'}</span>
                            <h2 class="mb-3 text-sm font-bold leading-tight text-[#0F284F] sm:text-xl">{product.name || 'Product enquiry'}</h2>
                            
                            <!-- 2. Neatly Arranged Specs List -->
                            <div class="mb-8 flex-1">
                                {#each formatProductSpecs(product.specs) as spec}
                                    <div class="flex items-start mb-2">
                                        <svg class="w-5 h-5 text-[#25D366] mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span class="text-sm text-slate-600 leading-snug">{spec}</span>
                                    </div>
                                {/each}
                                {#if !product.specs}
                                    <p class="text-sm text-slate-400 italic">Specifications available on inquiry.</p>
                                {/if}
                            </div>
                            
                            <!-- 3. Friendly WhatsApp Green Button -->
                            <a 
                                href={getProductQuoteUrl(product.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Get a quote for ${product.name || 'this product'} on WhatsApp`}
                                class="w-full bg-[#087A35] hover:bg-[#06662D] text-white text-center font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-auto"
                            >
                                <i class="fa-brands fa-whatsapp text-xl"></i>
                                Get a Quote
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
            
            {#if filteredProducts.length === 0}
                <div class="text-center py-20">
                    <i class="fa-solid fa-box-open text-6xl text-slate-300 mb-4"></i>
                    <h2 class="text-2xl font-bold text-[#0F284F]">No products in this category right now</h2>
                    <p class="text-slate-500 mt-2">Contact us for current {activeCategory} availability.</p>
                    <a href={getWhatsAppUrl(`Hi Arschis Computers, please share your current ${activeCategory} availability.`)} target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#087A35] px-5 py-3 font-bold text-white hover:bg-[#06662D]">
                        <i class="fa-brands fa-whatsapp mr-2" aria-hidden="true"></i> Ask on WhatsApp
                    </a>
                </div>
            {/if}
        {:else}
            <div class="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm" role="status">
                <i class="fa-solid fa-box-open text-5xl text-slate-300" aria-hidden="true"></i>
                <h2 class="mt-4 text-2xl font-bold text-[#0F284F]">
                    {data.productData.status === 'empty' ? 'Product information is currently being updated' : 'Products are temporarily unavailable online'}
                </h2>
                <p class="mx-auto mt-3 max-w-xl text-slate-600">Contact Arschis Computers for current availability and a direct quote.</p>
                <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href={getWhatsAppUrl('Hi Arschis Computers, please share your current product availability.')} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#087A35] px-5 py-3 font-bold text-white hover:bg-[#06662D]">
                        <i class="fa-brands fa-whatsapp mr-2" aria-hidden="true"></i> WhatsApp
                    </a>
                    <a href={phoneUrl} class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0B1F3A] px-5 py-3 font-bold text-white hover:bg-[#071426]">
                        <i class="fa-solid fa-phone mr-2" aria-hidden="true"></i> Call Now
                    </a>
                </div>
            </div>
        {/if}
    </div>
</main>
<Footer />
