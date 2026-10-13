<script lang="ts">
    import { isBookingOpen } from '$lib/store';
    import { phoneUrl } from '$lib/contact';
    import { site } from '$lib/site';
    import Seo from '$lib/components/Seo.svelte';
    import BusinessStructuredData from '$lib/components/BusinessStructuredData.svelte';
    import Reviews from '$lib/components/Reviews.svelte';
    import PreFooterCTA from '$lib/components/PreFooterCTA.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { googleMapsDirectionsUrl, googleMapsEmbedUrl } from '$lib/location';

    type FAQ = { q: string; a: string };
    let { title, description, path, heading, intro, services, faqs, serviceName, brands = [] }: {
        title: string; description: string; path: string; heading: string; intro: string;
        services: string[]; faqs?: FAQ[]; serviceName: string; brands?: string[];
    } = $props();

    const graph = $derived({
        '@context': 'https://schema.org', '@type': 'Service', name: serviceName,
        serviceType: serviceName, url: new URL(path, site.url).href,
        provider: { '@id': `${site.url}/#business`, '@type': 'ComputerStore', name: site.name },
        areaServed: { '@type': 'City', name: site.address.addressLocality }
    });
</script>

<Seo {title} {description} {path} />
<BusinessStructuredData />
<svelte:head>{@html `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`}</svelte:head>

<main class="min-w-0 bg-white pb-8 md:pb-0">
    <section class="min-w-0 bg-[#0B1F3A] px-4 py-16 text-white sm:py-24" aria-labelledby="service-heading">
        <div class="mx-auto min-w-0 max-w-5xl text-center">
            <p class="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#FFD700]">Arschis Computers · Erode</p>
            <h1 id="service-heading" class="text-3xl font-extrabold sm:text-5xl">{heading}</h1>
            <p class="mx-auto mt-5 max-w-2xl text-base text-slate-200 sm:text-xl">{intro}</p>
            <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button onclick={() => $isBookingOpen = true} class="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#D92323] px-4 font-bold text-white hover:bg-red-700 sm:w-auto sm:px-6">Book a Service</button>
                <a href={phoneUrl} class="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-[#FFD700] px-4 font-bold text-[#FFD700] sm:w-auto sm:px-6">Call Now</a>
                <a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-white/50 px-4 font-bold text-white sm:w-auto sm:px-6">Get Directions</a>
            </div>
        </div>
    </section>

    <section class="min-w-0 px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="services-heading">
        <div class="mx-auto min-w-0 max-w-6xl">
            <h2 id="services-heading" class="text-center text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">{serviceName}</h2>
            <div class="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each services as service}<article class="min-w-0 w-full break-words rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h3 class="break-words font-bold text-[#0B1F3A]">{service}</h3><p class="mt-2 break-words text-sm text-slate-600">Practical support and diagnosis from our Erode service team.</p></article>{/each}
            </div>
        </div>
    </section>

    {#if brands.length}<section class="bg-[#F5F7FA] px-4 py-12" aria-labelledby="brands-heading"><div class="mx-auto max-w-5xl text-center"><h2 id="brands-heading" class="text-2xl font-extrabold text-[#0B1F3A]">Laptop Brands We Service</h2><div class="mt-6 flex flex-wrap justify-center gap-3">{#each brands as brand}<span class="rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700">{brand}</span>{/each}</div></div></section>{/if}

    <section class="min-w-0 px-4 py-14 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="local-heading"><div class="mx-auto min-w-0 max-w-5xl"><h2 id="local-heading" class="break-words text-3xl font-extrabold text-[#0B1F3A]">{serviceName.replace(' and Repair', '')} in Erode</h2><p class="mt-4 max-w-3xl break-words text-slate-600">Arschis Computers serves customers in Erode and surrounding areas from 8, NSTV Building, Brough Road, Fort, Erode - 638001.</p><a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#D92323] px-5 py-3 font-bold text-white sm:w-auto">Get Directions</a></div></section>

    {#if faqs?.length}<section class="bg-[#F5F7FA] px-4 py-14 sm:py-20" aria-labelledby="faq-heading"><div class="mx-auto max-w-4xl"><h2 id="faq-heading" class="text-center text-3xl font-extrabold text-[#0B1F3A]">Frequently Asked Questions</h2><div class="mt-8 space-y-4">{#each faqs as faq}<details class="rounded-xl border border-slate-200 bg-white p-5"><summary class="cursor-pointer font-bold text-slate-800">{faq.q}</summary><p class="mt-3 text-slate-600">{faq.a}</p></details>{/each}</div></div></section>{/if}
    <div class="min-w-0 px-4 sm:px-6 lg:px-8"><div class="mx-auto min-w-0 max-w-7xl"><Reviews /></div></div>
</main>
<PreFooterCTA /><Footer />
