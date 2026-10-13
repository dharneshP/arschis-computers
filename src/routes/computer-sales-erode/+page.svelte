<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import BusinessStructuredData from '$lib/components/BusinessStructuredData.svelte';
    import PreFooterCTA from '$lib/components/PreFooterCTA.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { phoneUrl } from '$lib/contact';
    import { googleMapsDirectionsUrl } from '$lib/location';
    const categories = [
        { name: 'Laptops', copy: 'New, used and refurbished laptop listings based on current stock.', href: '/store/laptops/' },
        { name: 'Desktop Computers', copy: 'Desktop systems and PC products currently listed in our Store.', href: '/store/desktops/' },
        { name: 'Printers', copy: 'Printer products and related computer solutions available from current stock.', href: '/store/printers/' },
        { name: 'Monitors', copy: 'Monitor and display products listed in the current product catalogue.', href: '/store/monitors/' }
    ];
</script>
<Seo title="Computer Shop in Erode | Computer Sales | Arschis Computers" description="Shop laptops, desktops, printers, accessories and computer products in Erode at Arschis Computers. New and refurbished options available based on current stock." path="/computer-sales-erode/" />
<BusinessStructuredData />
<main class="min-w-0 bg-white">
    <section class="bg-[#0B1F3A] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8"><div class="mx-auto max-w-5xl text-center"><p class="text-sm font-bold uppercase tracking-[0.18em] text-[#FFD700]">Arschis Computers · Erode</p><h1 class="mt-3 text-3xl font-extrabold sm:text-5xl">Computer Sales in Erode</h1><p class="mx-auto mt-5 max-w-2xl text-slate-200 sm:text-xl">Shop current laptops, desktops, printers, monitors and computer products from Arschis Computers.</p><div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><a href="/store/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D92323] px-6 font-bold text-white">View Products</a><a href={phoneUrl} class="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-[#FFD700] px-6 font-bold text-[#FFD700]">Call Now</a><a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/50 px-6 font-bold text-white">Get Directions</a></div></div></section>
    <section class="px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="categories-heading"><div class="mx-auto max-w-6xl"><h2 id="categories-heading" class="text-center text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">Computer Products Available</h2><div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{#each categories as category}<article class="flex min-w-0 flex-col rounded-xl border border-slate-200 p-5 shadow-sm"><h3 class="text-xl font-bold text-[#0B1F3A]">{category.name}</h3><p class="mt-2 flex-1 text-sm text-slate-600">{category.copy}</p><a href={category.href} class="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#D92323] px-4 font-bold text-[#D92323]">Browse {category.name}</a></article>{/each}</div></div></section>
    <section class="bg-[#F5F7FA] px-4 py-14 sm:px-6 sm:py-20 lg:px-8"><div class="mx-auto max-w-5xl"><h2 class="text-3xl font-extrabold text-[#0B1F3A]">Computer Sales and Service in Erode</h2><p class="mt-4 max-w-3xl text-slate-600">Visit Arschis Computers at 8, NSTV Building, Brough Road, Fort, Erode - 638001. We also help with computer setup, printer setup, networking, workstation upgrades and troubleshooting based on your needs.</p><div class="mt-6 flex flex-col gap-3 sm:flex-row"><a href="/computer-service-erode/" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#D92323] px-5 font-bold text-white">Computer Service</a><a href="/store/" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#0B1F3A] px-5 font-bold text-[#0B1F3A]">View All Products</a></div></div></section>
</main>
<PreFooterCTA /><Footer />
