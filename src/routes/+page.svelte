<script lang="ts">
    import { isBookingOpen, isHeaderButtonVisible } from '$lib/store';
    import { onMount } from 'svelte';

    import Services from '$lib/components/Services.svelte';
    import WhyArschis from '$lib/components/WhyArschis.svelte';
    import ServiceProcess from '$lib/components/ServiceProcess.svelte';
    import ProductPreview from '$lib/components/ProductPreview.svelte';
    import OurWorkPreview from '$lib/components/OurWorkPreview.svelte';
    import Reviews from '$lib/components/Reviews.svelte';
    import Map from '$lib/components/Map.svelte';
    import PreFooterCTA from '$lib/components/PreFooterCTA.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Seo from '$lib/components/Seo.svelte';
    import BusinessStructuredData from '$lib/components/BusinessStructuredData.svelte';
    import { phoneUrl } from '$lib/contact';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();

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

<Seo
    title="Arschis Computers | Computer Sales & Service in Erode"
    description="Arschis Computers provides computer sales and service in Erode, including laptops, PCs, printers, networking, CCTV and IT support."
    path="/"
/>
<BusinessStructuredData />

<main class="w-full bg-white">
    <!-- Hero Section -->
    <section class="relative isolate flex min-h-[31rem] items-center overflow-hidden border-t border-slate-200 px-4 py-16 sm:min-h-[34rem] sm:py-24" aria-labelledby="hero-heading">
        <!-- TODO: Replace this temporary stock image with /arschis-computers-erode-store.webp when a genuine storefront photo is available. -->
        <img
            src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1920&q=80"
            srcset="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=640&q=78 640w, https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1024&q=80 1024w, https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1920&q=80 1920w"
            sizes="100vw"
            alt=""
            width="1920"
            height="1280"
            fetchpriority="high"
            decoding="async"
            class="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div class="absolute inset-0 -z-10 bg-gradient-to-r from-[#071426]/90 via-[#0B1F3A]/80 to-[#071426]/65"></div>
        
        <div class="relative z-10 mx-auto max-w-4xl text-center text-white">
            <h1 id="hero-heading" class="mb-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-6xl">Computer Sales &amp; Service in Erode</h1>
            <p class="mb-9 text-base font-medium tracking-wide text-slate-100 sm:text-xl">
                Laptops &bull; PCs &bull; Printers &bull; Networking &bull; IT Solutions
            </p>
            
            <!-- Dual CTAs -->
            <div class="mx-auto flex max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
                <button bind:this={heroButtonElement} onclick={() => $isBookingOpen = true} class="inline-flex min-h-14 w-full items-center justify-center rounded-lg bg-[#D92323] px-7 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-red-700 focus-visible:outline-white sm:w-auto">
                    <i class="fa-solid fa-wrench mr-2" aria-hidden="true"></i> Book a Service
                </button>
                <a href={phoneUrl} aria-label="Call Arschis Computers now" class="inline-flex min-h-14 w-full items-center justify-center rounded-lg border-2 border-[#F5C400] px-7 py-3 text-lg font-bold text-[#F5C400] shadow-lg transition-colors hover:bg-[#F5C400] hover:text-[#071426] focus-visible:outline-white sm:w-auto">
                    <i class="fa-solid fa-phone mr-2" aria-hidden="true"></i> Call Now
                </a>
            </div>
        </div>
    </section>

    <!-- Quick Service Strip -->
    <section class="border-b border-slate-200 bg-[#F5F7FA] py-4" aria-label="Quick services">
        <div class="mx-auto max-w-7xl">
            <div class="scrollbar-hidden grid auto-cols-[8.5rem] grid-flow-col gap-3 overflow-x-auto px-4 pb-1 snap-x snap-mandatory md:grid-flow-row md:grid-cols-4 md:overflow-visible md:px-6 md:pb-0 lg:px-8">
                {#each [
                    { name: 'PC', icon: 'fa-desktop' },
                    { name: 'Printer', icon: 'fa-print' },
                    { name: 'Networking', icon: 'fa-network-wired' },
                    { name: 'CCTV', icon: 'fa-video' }
                ] as service}
                    <a href="#services" class="group flex min-h-20 snap-start items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 font-bold text-[#172033] transition-colors hover:border-[#D92323] hover:text-[#D92323] focus-visible:outline-[#D92323]">
                        <i class="fa-solid {service.icon} text-xl text-[#0B1F3A] transition-colors group-hover:text-[#D92323]" aria-hidden="true"></i>
                        <span>{service.name}</span>
                    </a>
                {/each}
            </div>
        </div>
    </section>
    
    <Services />
    <WhyArschis />
    <ServiceProcess />
    <ProductPreview productData={data.productData} />
    <OurWorkPreview data={data.galleryData} />
    <Reviews />
    <Map />
</main>

<PreFooterCTA />
<Footer />
