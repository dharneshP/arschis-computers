<script lang="ts">
    import Seo from '$lib/components/Seo.svelte';
    import BusinessStructuredData from '$lib/components/BusinessStructuredData.svelte';
    import HomeHero from '$lib/components/home/HomeHero.svelte';
    import ShopCategories from '$lib/components/home/ShopCategories.svelte';
    import AboutContact from '$lib/components/home/AboutContact.svelte';
    import ProductPreview from '$lib/components/ProductPreview.svelte';
    import Services from '$lib/components/Services.svelte';
    import WhyArschis from '$lib/components/WhyArschis.svelte';
    import Reviews from '$lib/components/Reviews.svelte';
    import ServiceProcess from '$lib/components/ServiceProcess.svelte';
    import OurWorkPreview from '$lib/components/OurWorkPreview.svelte';
    import type { PageProps } from './$types';
    let { data }: PageProps = $props();
</script>

<Seo
    title="Arschis Computers | Computer Sales & Service in Erode"
    description="Arschis Computers provides computer sales and service in Erode, including laptops, PCs, printers, networking and IT support."
    path="/"
/>
<BusinessStructuredData />
<svelte:head>
    <link rel="preload" as="image" imagesrcset="/premium-hero-600.webp 600w, /premium-hero-900.webp 900w, /premium-hero-1200.webp 1200w" imagesizes="(min-width: 1280px) 580px, (min-width: 1024px) 48vw, 100vw" type="image/webp" fetchpriority="high" />
</svelte:head>

<main class="min-w-0 bg-white">
    <HomeHero />
    <ShopCategories images={data.categoryImages} />
    <ProductPreview productData={data.productData} />
    <Services />
    <WhyArschis />
    <Reviews />
    <ServiceProcess />
    <OurWorkPreview data={data.galleryData} />
    <AboutContact />
</main>
