<script lang="ts">
    // Brought back isHeaderButtonVisible!
    import { isBookingOpen, isHeaderButtonVisible } from '$lib/store';
    import { getWhatsAppUrl } from '$lib/contact';

    // Svelte 5 reactive state
    let isMobileMenuOpen = $state(false);
    const whatsappUrl = getWhatsAppUrl();
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && (isMobileMenuOpen = false)} />

<header class="bg-white border-b border-slate-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            
            <!-- Unified Logo Area -->
            <div class="flex-shrink-0 flex items-center">
                <a 
                    href="/" 
                    class="flex items-center group py-2" 
                    aria-label="Arschis Computers Home"
                >
                    <img 
                        src="/logo.png" 
                        alt="Arschis Computers" 
                        class="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                    />
                </a>
            </div>

            <!-- Desktop Navigation (Max 6 Items) -->
            <nav aria-label="Primary navigation" class="hidden lg:flex space-x-5 xl:space-x-8 items-center justify-end flex-1">
                <a href="/" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Home</a>
                <a href="/#services" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Services</a>
                <a href="/store" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Products</a>
                <a href="/gallery" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Our Work</a>
                <a href="/#contact" class="text-slate-700 hover:text-[#DC2626] font-semibold transition-colors">Contact</a>
                
                <!-- Dedicated WhatsApp Navigation CTA -->
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-[#168a43] hover:text-green-700 transition-colors font-bold whitespace-nowrap">
                    <i class="fa-brands fa-whatsapp text-xl"></i> WhatsApp Us
                </a>
                
                <!-- Desktop Autohide Book Button -->
                <div class="overflow-hidden flex items-center transition-all duration-300 ease-in-out { $isHeaderButtonVisible ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0 pointer-events-none' }">
                    <button 
                        onclick={() => $isBookingOpen = true}
                        class="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 text-sm rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap ml-2"
                    >
                        Book a Service
                    </button>
                </div>
            </nav>

            <!-- Mobile Buttons Area -->
            <div class="lg:hidden flex items-center shrink-0">
                
                <!-- Mobile Autohide Book Button -->
                <div class="overflow-hidden flex items-center transition-all duration-300 ease-in-out { $isHeaderButtonVisible ? 'max-w-[100px] mr-3 opacity-100' : 'max-w-0 mr-0 opacity-0 pointer-events-none' }">
                    <button 
                        onclick={() => $isBookingOpen = true}
                        class="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-4 py-2 text-sm rounded-lg font-bold shadow-md transition-colors whitespace-nowrap"
                    >
                        Book
                    </button>
                </div>
                
                <!-- Hamburger Menu Toggle -->
                <button 
                    onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
                    class="flex min-h-11 min-w-11 items-center justify-center text-slate-700 hover:text-[#DC2626] p-1 transition-colors"
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    <i class="fa-solid {isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl"></i>
                </button>
            </div>

        </div>
    </div>

    <!-- Mobile Navigation Menu -->
    {#if isMobileMenuOpen}
        <div id="mobile-navigation" class="lg:hidden absolute top-20 left-0 w-full max-h-[calc(100vh-5rem-3.5rem)] overflow-y-auto bg-white border-b border-slate-200 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div class="px-4 py-6 space-y-2 flex flex-col">
                <a href="/" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Home</a>
                <a href="/#services" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Services</a>
                <a href="/store" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Products</a>
                <a href="/gallery" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Our Work</a>
                <a href="/#contact" onclick={() => isMobileMenuOpen = false} class="block px-4 py-3 text-base font-bold text-slate-700 hover:text-[#DC2626] hover:bg-slate-50 rounded-xl transition-colors">Contact</a>
                
                <!-- Keep a permanent book button inside the mobile dropdown menu -->
                <div class="pt-2 mt-2 border-t border-slate-100 flex flex-col gap-3">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onclick={() => isMobileMenuOpen = false}
                        class="w-full text-center border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp Us
                    </a>
                    <button 
                        onclick={() => { isMobileMenuOpen = false; $isBookingOpen = true; }}
                        class="w-full text-center bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold py-3 rounded-xl shadow-sm transition-colors"
                    >
                        Book a Service
                    </button>
                </div>
            </div>
        </div>
    {/if}
</header>
