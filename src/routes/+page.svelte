<script lang="ts">
    // 1. Your global state and Svelte utilities
    import { isBookingOpen, isHeaderButtonVisible } from '$lib/store';
    import { onMount } from 'svelte';
    
    // 2. Restore your missing component imports!
    import Header from '$lib/components/Header.svelte';
    import Services from '$lib/components/Services.svelte';
    import Brands from '$lib/components/Brands.svelte';
    import Reviews from '$lib/components/Reviews.svelte';
    import Map from '$lib/components/Map.svelte';
    import Footer from '$lib/components/Footer.svelte';

    // 3. The scroll-tracking logic for the new button
    let heroButtonElement: HTMLElement;

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                $isHeaderButtonVisible = !entry.isIntersecting;
            });
        }, {
            threshold: 0, 
            rootMargin: "-80px 0px 0px 0px" 
        });

        if (heroButtonElement) {
            observer.observe(heroButtonElement);
        }

        return () => {
            if (heroButtonElement) {
                observer.unobserve(heroButtonElement);
            }
        };
    });
</script>

<Header />

<main class="w-full bg-white">
    <!-- Image Background Hero Section -->
    <section class="relative py-24 sm:py-32 px-4 overflow-hidden border-t border-slate-200">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div class="absolute inset-0 bg-slate-900/85"></div>
        
        <div class="relative max-w-4xl mx-auto text-center z-10 text-white">
            <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Expert Computer Sales & Service in Erode</h2>
            <p class="text-lg sm:text-xl text-[#FFD700] font-medium mb-10">
                Serving Erode with 20 years experience and 5-star rated service.
            </p>
           <button bind:this={heroButtonElement} onclick={(e) => { e.preventDefault(); $isBookingOpen = true; }} class="bg-[#DC2626] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 text-lg inline-flex items-center w-fit">
    <i class="fa-solid fa-wrench mr-2"></i> Book a Service
</button>
        </div>
    </section>

    <!-- Components strictly ordered to match design -->
    <Services />
    <Map />
    <Reviews />
    <Brands />
</main>

<Footer />