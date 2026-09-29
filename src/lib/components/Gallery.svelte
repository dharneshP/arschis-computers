<script lang="ts">
    // High-quality stock images matching Arschis Computers' core services.
    // You can replace these URLs with your own local files in the future!
    const galleryImages = [
        {
            title: "Chip-Level Motherboard Repair",
            url: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
            alt: "Technician soldering a computer motherboard"
        },
        {
            title: "CCTV & Security Installation",
            url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
            alt: "Modern security camera installation"
        },
        {
            title: "Printer Servicing & Toner Refill",
            url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=800&auto=format&fit=crop",
            alt: "Hardware diagnostic tools"
        },
        {
            title: "Custom PC Assembling",
            url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop",
            alt: "Inside of a custom gaming PC with RGB lighting"
        },
        {
            title: "Laptop Screen & Battery Replacement",
            url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
            alt: "Technician opening a laptop for repair"
        },
        {
            title: "Networking & Server Setup",
            url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
            alt: "Server rack with neatly organized network cables"
        }
    ];
</script>

<section id="gallery" class="py-16 sm:py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Our Work Gallery</h2>
            <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                A glimpse into our daily operations, featuring chip-level repairs, custom desktop builds, and professional hardware diagnostics.
            </p>
        </div>

        <!-- Responsive Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {#each galleryImages as image}
                <!-- Card Container -->
                <div class="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 aspect-video sm:aspect-square bg-slate-100 cursor-pointer">
                    
                    <!-- Image with Zoom-on-Hover Effect -->
                    <img 
                        src={image.url} 
                        alt={image.alt}
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    
                    <!-- Dark Gradient Overlay (Only appears on hover) -->
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        
                        <!-- Animated Text -->
                        <div class="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 class="text-white font-bold text-lg sm:text-xl">{image.title}</h3>
                            <div class="w-12 h-1 bg-[#DC2626] mt-3 rounded-full"></div>
                        </div>
                        
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>