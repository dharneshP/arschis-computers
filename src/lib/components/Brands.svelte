<script lang="ts">
    // We mix CDN URLs for global brands, and leave it 'null' for regional 
    // or hardware brands so the code auto-generates a sleek text-based logo!
    const brands = [
        { name: 'Acer', url: 'https://cdn.simpleicons.org/acer' },
        { name: 'ASUS', url: 'https://cdn.simpleicons.org/asus' },
        { name: 'Brother', url: null }, 
        { name: 'Dell', url: 'https://cdn.simpleicons.org/dell' },
        { name: 'D-Link', url: null },  
        { name: 'Epson', url: 'https://cdn.simpleicons.org/epson' },
        { name: 'HP', url: 'https://cdn.simpleicons.org/hp' },
        { name: 'Intel', url: 'https://cdn.simpleicons.org/intel' },
        { name: 'Lenovo', url: 'https://cdn.simpleicons.org/lenovo' },
        { name: 'Logitech', url: null }, 
        { name: 'Numeric', url: null },
        { name: 'Samsung', url: 'https://cdn.simpleicons.org/samsung' },
        { name: 'TVS', url: null },     
        { name: 'V-Guard', url: null }  
    ];
</script>

<section id="brands" class="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Multi-Brand Specialist</h2>
            <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Expert diagnostics, genuine replacement parts, and dedicated service for all major computer and electronics manufacturers.
            </p>
        </div>
        
        <!-- Logo Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-center justify-items-center">
            {#each brands as brand}
                <div class="flex items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full h-20 sm:h-24 group cursor-pointer">
                    {#if brand.url}
                        <!-- SVG Logo for Global Brands - NOW IN FULL COLOR BY DEFAULT -->
                        <img 
                            src={brand.url} 
                            alt="{brand.name} authorized service" 
                            title={brand.name}
                            class="max-h-8 sm:max-h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
                            loading="lazy"
                        />
                    {:else}
                        <!-- Stylized Text Logo for Regional Brands - NOW DARK & HIGHLY VISIBLE -->
                        <span class="text-sm sm:text-lg font-black text-slate-800 group-hover:text-[#DC2626] transition-colors duration-300 tracking-wider text-center uppercase" title={brand.name}>
                            {brand.name}
                        </span>
                    {/if}
                </div>
            {/each}
        </div>
        
        <!-- Bottom Trust Badge -->
        <div class="mt-12 text-center">
            <div class="inline-flex items-center justify-center px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <i class="fa-solid fa-check-circle text-green-600 mr-2"></i>
                <span class="text-sm font-bold text-green-800">Original Parts Guaranteed</span>
            </div>
        </div>
    </div>
</section>