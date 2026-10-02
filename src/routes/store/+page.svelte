<script lang="ts">
    import {
        formatProductSpecs,
        getProductQuoteUrl,
        productCategories,
        getOptimizedProductImage,
    } from '$lib/products';
    import Seo from '$lib/components/Seo.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
    let activeCategory = $state('All');

    const categories = productCategories;

    let filteredProducts = $derived(
        activeCategory === 'All' 
            ? data.productData.products
            : data.productData.products.filter((product) => product.category === activeCategory)
    );

</script>

<Seo
    title="Computer Products | Arschis Computers"
    description="Explore desktops, PC cabinets and computer components available from Arschis Computers in Erode, with direct quote enquiries."
    path="/store"
/>

<main class="min-h-screen bg-slate-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
                <h1 class="text-4xl md:text-5xl font-extrabold text-[#0F284F] mb-4">Our Store</h1>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">
                Browse our premium selection of branded desktops, high-airflow gaming cabinets, and core components. Tap 'Enquire' to get an instant quote via WhatsApp.
            </p>
        </div>

        <!-- Category Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-12">
            {#each categories as category}
                <button 
                    onclick={() => activeCategory = category}
                    aria-pressed={activeCategory === category}
                    class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-sm 
                    {activeCategory === category 
                        ? 'bg-[#0F284F] text-white ring-2 ring-[#0F284F] ring-offset-2 ring-offset-slate-50' 
                        : 'bg-white text-slate-600 hover:text-[#0F284F] hover:bg-slate-100 border border-slate-200'}"
                >
                    {category}
                </button>
            {/each}
        </div>

        {#if data.productData.status === 'success'}
            <!-- Product Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each filteredProducts as product}
                    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                        
                        <div class="h-64 bg-slate-100 p-4 relative overflow-hidden flex items-center justify-center">
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
                        
                        <div class="p-6 flex flex-col flex-1">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{product.category || 'Uncategorized'}</span>
                            <h2 class="text-xl font-bold text-[#0F284F] mb-4 leading-tight">{product.name || 'Product enquiry'}</h2>
                            
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
