<script lang="ts">
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    const strengths = [
        { title: 'Sales & service together', copy: 'Explore products and get help with troubleshooting, setup and upgrades from one business.', icon: 'fa-laptop' },
        { title: 'A local store to visit', copy: 'Discuss your requirements with our team at our Brough Road store in Erode.', icon: 'fa-location-dot' },
        { title: 'Options for your needs', copy: 'Browse new, used and refurbished listings, with product conditions clearly identified.', icon: 'fa-sliders' },
        { title: 'A direct conversation', copy: 'Ask about availability, specifications or service by phone or WhatsApp.', icon: 'fa-comments' }
    ];
</script>
<section class="bg-white py-section" aria-labelledby="why-heading">
    <div class="site-container">
        <SectionHeading id="why-heading" title="Why Choose Arschis?" description="Straightforward support, from choosing a computer to caring for it." align="center" />
        <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {#each strengths as strength}<div class="min-w-0 text-center"><span class="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-brand-blue"><i class="fa-solid {strength.icon}" aria-hidden="true"></i></span><h3 class="text-lg font-semibold text-brand-navy">{strength.title}</h3><p class="mt-3 text-sm leading-relaxed text-brand-muted">{strength.copy}</p></div>{/each}
        </div>
    </div>
</section>
