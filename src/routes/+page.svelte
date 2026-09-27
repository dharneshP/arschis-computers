<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Services from '$lib/components/Services.svelte';
    import Brands from '$lib/components/Brands.svelte';
    import Reviews from '$lib/components/Reviews.svelte';
    import Map from '$lib/components/Map.svelte';
    import Footer from '$lib/components/Footer.svelte';
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
            <a href="#contact" class="inline-flex items-center bg-[#DC2626] text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition-all shadow-lg text-lg">
                <i class="fa-solid fa-screwdriver-wrench mr-2"></i> Book a Service
            </a>
        </div>
    </section>

    <!-- Components strictly ordered to match design -->
    <Services />
    <Map />
    <Reviews />
    <Brands />
</main>

<Footer />