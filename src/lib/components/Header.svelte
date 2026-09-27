<script lang="ts">
    import BookingModal from './BookingModal.svelte';
    import { isBookingOpen } from '$lib/store';
</script>

<header class="bg-white shadow-sm sticky top-0 z-50">
    <!-- Yellow Top Bar -->
    <div class="bg-[#FFD700] text-slate-900 text-xs py-2 px-4 font-bold border-b border-yellow-500">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <span><i class="fa-solid fa-location-dot text-[#DC2626] mr-1"></i> Erode, Tamil Nadu</span>
            <a href="tel:+919944252527" class="hover:text-[#DC2626] transition"><i class="fa-solid fa-phone mr-1"></i> Call Us Today</a>
        </div>
    </div>
    
    <!-- Main Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div class="flex items-center">
            
            <!-- Custom SVG Logo -->
            <svg viewBox="0 0 100 100" class="h-10 sm:h-12 w-auto mr-3 shrink-0 transition-transform hover:scale-105" fill="none" stroke="#1F2937" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M35 30 C 20 20, 10 40, 25 55" /> 
                <path d="M35 30 C 50 15, 75 25, 75 45 C 75 65, 55 65, 50 65" /> 
                <path d="M50 65 C 45 65, 35 75, 40 85 C 45 95, 55 90, 55 80" /> 
                <circle cx="45" cy="45" r="4" fill="#DC2626" stroke="none" /> 
                <path d="M45 20 L 50 28 L 55 20" stroke="#DC2626" stroke-width="2" />
            </svg>
            
            <div class="flex flex-col justify-center">
                <h1 class="text-xl sm:text-2xl font-extrabold text-[#DC2626] tracking-wide leading-none mb-1">ARSCHIS COMPUTERS</h1>
                <p class="text-[10px] text-slate-700 font-bold uppercase tracking-widest leading-none">Multi Brand's Sales & Service</p>
            </div>
        </div>
        
        <!-- Desktop Navigation & Booking Button -->
        <div class="flex items-center space-x-6">
            <div class="hidden md:flex space-x-8 text-sm font-bold text-slate-600 mr-4">
                <a href="#services" class="hover:text-[#DC2626] transition">Services</a>
                <a href="#brands" class="hover:text-[#DC2626] transition">Brands</a>
                <a href="#contact" class="hover:text-[#DC2626] transition">Contact</a>
            </div>
            
            <!-- The Trigger Button -->
<button onclick={() => $isBookingOpen = true} class="bg-[#DC2626] hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all hover:-translate-y-0.5 text-sm sm:text-base flex items-center">
    <i class="fa-regular fa-calendar-check mr-2"></i> Book Service
</button>
        </div>
    </div>
</header>

<!-- The actual modal component -->
<BookingModal bind:showModal={$isBookingOpen} />