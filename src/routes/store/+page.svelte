<script lang="ts">
    import { onMount } from 'svelte';
    import { createClient } from '@sanity/client';

    let products: any[] = $state([]);
    let isLoading = $state(true);
    let activeCategory = $state('All');

    const categories = ['All', 'Branded Desktops', 'PC Cabinets', 'PC Components'];
    const whatsappNumber = "919944252527"; 

    const client = createClient({
        projectId: 'aetlx2e6',
        dataset: 'production',
        useCdn: true, 
        apiVersion: '2024-01-01' 
    });

    onMount(async () => {
        try {
            const query = `*[_type == "product"]{
                name, 
                category, 
                specs, 
                "image": image.asset->url
            }`;
            
            products = await client.fetch(query);
        } catch (error) {
            console.error("Failed to load products from Sanity:", error);
            products = [];
        } finally {
            isLoading = false;
        }
    });

    let filteredProducts = $derived(
        activeCategory === 'All' 
            ? products 
            : products.filter((p: any) => p.category === activeCategory)
    );

    // HELPER: Turns "Intel i3 | 8GB RAM" into a neat array for list rendering
    function formatSpecs(specsString: string) {
        if (!specsString) return [];
        return specsString.split(/\||,/).map(s => s.trim()).filter(s => s.length > 0);
    }

    function getWhatsAppLink(productName: string) {
        const message = encodeURIComponent(`Hi Arschis Computers, I am interested in the ${productName || 'product'}. Could you share the price and availability?`);
        return `https://wa.me/${whatsappNumber}?text=${message}`;
    }
</script>

<div class="min-h-screen bg-slate-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
            <!-- 1. Logo Added Here -->
            <img 
                src="/logo.png" 
                alt="Arschis Computers Logo" 
                class="h-20 md:h-24 mx-auto mb-6 object-contain"
                onerror={(e) => e.currentTarget.style.display = 'none'}
            />
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
                    class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-sm 
                    {activeCategory === category 
                        ? 'bg-[#0F284F] text-white ring-2 ring-[#0F284F] ring-offset-2 ring-offset-slate-50' 
                        : 'bg-white text-slate-600 hover:text-[#0F284F] hover:bg-slate-100 border border-slate-200'}"
                >
                    {category}
                </button>
            {/each}
        </div>

        {#if isLoading}
            <div class="flex flex-col items-center justify-center py-20 space-y-4">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-[#0F284F]"></div>
                <p class="text-slate-500 font-medium animate-pulse">Loading latest inventory...</p>
            </div>
        {:else}
            <!-- Product Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each filteredProducts as product}
                    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                        
                        <div class="h-64 bg-slate-100 p-4 relative overflow-hidden flex items-center justify-center">
                            <img 
                                src={product.image || '/logo.png'} 
                                alt={product.name || 'Product Image'} 
                                class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                onerror={(e) => e.currentTarget.src = '/logo.png'}
                            />
                        </div>
                        
                        <div class="p-6 flex flex-col flex-1">
                            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{product.category || 'Uncategorized'}</span>
                            <h3 class="text-xl font-bold text-[#0F284F] mb-4 leading-tight">{product.name || 'Loading Name...'}</h3>
                            
                            <!-- 2. Neatly Arranged Specs List -->
                            <div class="mb-8 flex-1">
                                {#each formatSpecs(product.specs) as spec}
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
                                href={getWhatsAppLink(product.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-center font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-auto"
                            >
                                <i class="fa-brands fa-whatsapp text-xl"></i>
                                Enquire on WhatsApp
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
            
            {#if filteredProducts.length === 0}
                <div class="text-center py-20">
                    <i class="fa-solid fa-box-open text-6xl text-slate-300 mb-4"></i>
                    <h3 class="text-2xl font-bold text-[#0F284F]">More stock arriving soon!</h3>
                    <p class="text-slate-500 mt-2">We are currently updating our inventory for {activeCategory}.</p>
                </div>
            {/if}
        {/if}
    </div>
</div>