<script lang="ts">
    import { isBookingOpen, isHeaderButtonVisible } from '$lib/store';
    let isMobileMenuOpen = $state(false);
</script>

<header class="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            
            <!-- Logo Area -->
            <div class="flex-shrink-0 flex items-center min-w-0"> <!-- min-w-0 helps prevent flexbox overflow -->
                <a href="/" class="flex items-center group">
                    <!-- Custom SVG Logo -->
                    <svg viewBox="0 0 100 100" class="h-8 sm:h-12 w-auto mr-2 sm:mr-3 shrink-0 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="#1F2937" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M35 30 C 20 20, 10 40, 25 55" /> 
                        <path d="M35 30 C 50 15, 75 25, 75 45 C 75 65, 55 65, 50 65" /> 
                        <path d="M50 65 C 45 65, 35 75, 40 85 C 45 95, 55 90, 55 80" /> 
                        <circle cx="45" cy="45" r="4" fill="#DC2626" stroke="none" /> 
                        <path d="M45 20 L 50 28 L 55 20" stroke="#DC2626" stroke-width="2" />
                    </svg>
                    
                    <!-- Added text-xl for mobile, sm:text-2xl for desktop, and whitespace-nowrap -->
                    <span class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap">
                        ARSCHIS <span class="text-[#DC2626]">COMPUTERS</span>
                    </span>
                </a>
            </div>

            <!-- Desktop Navigation (Quick Links) -->
            <nav class="hidden md:flex space-x-8 items-center justify-end flex-1">
                <a href="/" class="text-slate-600 hover:text-[#DC2626] font-medium transition-colors">Home</a>
                <a href="/store" class="text-slate-600 hover:text-[#DC2626] font-medium transition-colors">Store</a>
                <a href="/gallery" class="text-slate-600 hover:text-[#DC2626] font-medium transition-colors">Gallery</a>
                <a href="/faq" class="text-slate-600 hover:text-[#DC2626] font-medium transition-colors">FAQ</a>
                
                <!-- Scroll-Triggered Booking Button -->
                <div class="overflow-hidden flex items-center transition-all duration-500 ease-in-out { $isHeaderButtonVisible ? 'max-w-[200px] ml-4 opacity-100' : 'max-w-0 ml-0 opacity-0' }">
                    <button 
                        onclick={() => $isBookingOpen = true}
                        class="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 rounded-lg font-bold shadow-md whitespace-nowrap"
                    >
                        Book a Service
                    </button>
                </div>
            </nav>

            <!-- Mobile Hamburger Button -->
            <div class="md:hidden flex items-center space-x-3 sm:space-x-4 shrink-0"> <!-- Added shrink-0 to protect buttons -->
                <button 
                    onclick={() => $isBookingOpen = true}
                    class="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-3 sm:px-4 py-2 text-sm rounded-lg font-bold shadow-md transition-colors"
                >
                    Book
                </button>
                
                <button 
                    onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
                    class="text-slate-600 hover:text-[#DC2626] focus:outline-none p-1 transition-colors"
                    aria-label="Toggle menu"
                >
                    <i class="fa-solid {isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl"></i>
                </button>
            </div>
            
        </div>
    </div>

    <!-- Mobile Navigation Menu -->
    {#if isMobileMenuOpen}
        <div class="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div class="px-4 py-6 space-y-2 flex flex-col">
                <a href="/" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Home</a>
                <a href="/store" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Store</a>
                <a href="/gallery" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Gallery</a>
                <a href="/faq" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">FAQ</a>
            </div>
        </div>
    {/if}
</header>