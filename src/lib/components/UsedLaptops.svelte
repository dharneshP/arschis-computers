<script lang="ts">
    const laptops = [
        {
            brand: "Lenovo",
            model: "ThinkPad T480",
            specs: ["Intel Core i5 8th Gen", "8GB RAM", "256GB NVMe SSD", "14-inch FHD Display"],
            price: "₹18,500",
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop",
            condition: "Excellent"
        },
        {
            brand: "Dell",
            model: "Latitude 7490",
            specs: ["Intel Core i5 8th Gen", "16GB RAM", "512GB SSD", "14-inch Display"],
            price: "₹21,000",
            image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",
            condition: "Like New"
        },
        {
            brand: "HP",
            model: "EliteBook 840 G5",
            specs: ["Intel Core i7 8th Gen", "16GB RAM", "512GB SSD", "14-inch IPS Display"],
            price: "₹24,500",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop",
            condition: "Very Good"
        }
    ];

    const whatsappNumber = "919944252527";

    // This dynamically generates a message for the specific laptop they clicked
    function getWhatsAppUrl(laptopModel: string) {
        const message = `Hi Arschis Computers, I saw the refurbished ${laptopModel} on your website. Is it still available?`;
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }
</script>

<!-- Using bg-white to keep the Zebra-Striping going -->
<section id="refurbished" class="py-16 sm:py-24 bg-white border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center mb-12 sm:mb-16">
            <span class="text-[#DC2626] font-bold tracking-wider uppercase text-sm mb-2 block">Premium Retail</span>
            <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Certified Refurbished Laptops</h2>
            <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                High-performance corporate laptops, fully tested, upgraded, and backed by our Arschis quality guarantee at a fraction of the cost.
            </p>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each laptops as laptop}
                <div class="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                    
                    <!-- Product Image with Condition Badge -->
                    <div class="relative h-56 overflow-hidden">
                        <img 
                            src={laptop.image} 
                            alt="{laptop.brand} {laptop.model}" 
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-slate-100">
                            Condition: <span class="text-green-600">{laptop.condition}</span>
                        </div>
                    </div>

                    <!-- Product Details -->
                    <div class="p-6 flex-1 flex flex-col">
                        <div class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{laptop.brand}</div>
                        <h3 class="text-xl font-extrabold text-slate-900 mb-4">{laptop.model}</h3>
                        
                        <ul class="space-y-2 mb-6 flex-1">
                            {#each laptop.specs as spec}
                                <li class="flex items-center text-slate-600 text-sm">
                                    <i class="fa-solid fa-check text-green-500 mr-2 text-xs"></i>
                                    {spec}
                                </li>
                            {/each}
                        </ul>

                        <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-200">
                            <div class="text-2xl font-black text-slate-900">{laptop.price}</div>
                            
                            <a 
                                href={getWhatsAppUrl(laptop.model)}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bg-[#25D366] hover:bg-[#20b858] text-white px-4 py-2 rounded-lg font-bold shadow-md transition-colors flex items-center text-sm"
                            >
                                <i class="fa-brands fa-whatsapp mr-2 text-lg"></i> Buy
                            </a>
                        </div>
                    </div>

                </div>
            {/each}
        </div>
        
    </div>
</section>