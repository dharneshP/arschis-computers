<script lang="ts">
    import { isBookingOpen, isHeaderButtonVisible } from '$lib/store';
    
    // Svelte 5 reactive state
    let isMobileMenuOpen = $state(false);
</script>

<header class="bg-white border-b border-slate-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            
            <!-- Highlighted Unified Logo Area -->
            <div class="flex-shrink-0 flex items-center">
                <a 
                    href="/" 
                    class="flex items-center group py-2" 
                    aria-label="Arschis Computers Home"
                >
                    <!-- Unified Logo Image (Icon + Text) -->
                    <img 
                        src="/logo.png" 
                        alt="Arschis Computers" 
                        class="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8 items-center justify-end flex-1">
                <a href="/" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Home</a>
                <a href="/store" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Store</a>
                <a href="/gallery" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Gallery</a>
                <a href="/faq" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">FAQ</a>
            </nav>

            <!-- Mobile Buttons Area -->
            <div class="md:hidden flex items-center shrink-0">
                
                <!-- Scroll-Triggered Mobile Booking Button -->
                <div class="overflow-hidden flex items-center transition-all duration-300 ease-in-out { $isHeaderButtonVisible ? 'max-w-[100px] mr-3 opacity-100' : 'max-w-0 mr-0 opacity-0 pointer-events-none' }">
                    <button 
                        onclick={() => $isBookingOpen = true}
                        class="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-3 py-2 text-sm rounded-lg font-bold shadow-md transition-colors whitespace-nowrap"
                    >
                        Book
                    </button>
                </div>
                
                <!-- Hamburger Menu Toggle -->
                <button 
                    onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
                    class="text-slate-700 hover:text-[#DC2626] focus:outline-none p-1 transition-colors"
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