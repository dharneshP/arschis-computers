<script lang="ts">
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import ContactActions from '$lib/components/ContactActions.svelte';
    import Map from '$lib/components/Map.svelte';
    import { site, businessAddress, businessHoursLabel } from '$lib/site';
    import { phoneUrl, businessPhone, secondaryPhoneUrl, secondaryBusinessPhone } from '$lib/contact';
    import { googleMapsDirectionsUrl } from '$lib/location';
</script>

<section id="about" class="scroll-mt-24 border-t border-brand-border bg-brand-neutral py-section" aria-labelledby="about-heading">
    <div class="site-container grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <SectionHeading id="about-heading" eyebrow="Your local technology partner" title={'About ' + site.name} description="Computer sales and service, brought together. We help home users and businesses in Erode with computers, printers, upgrades, networking and ongoing IT support." />
        <div class="space-y-5 text-base leading-relaxed text-brand-muted">
            <p>Explore new, used and refurbished products based on our current catalogue, or talk to us about a device that needs attention. Product pricing and availability are confirmed directly with our team.</p>
            <p>From choosing a computer to troubleshooting and maintenance, you can discuss your requirements with us by phone, on WhatsApp or at our Brough Road store.</p>
            <div class="flex flex-wrap gap-3"><Button href="/computer-sales-erode/" variant="secondary">Computer Sales</Button><Button href="/computer-service-erode/" variant="secondary">Computer Service</Button></div>
        </div>
    </div>
</section>
<section id="contact" class="scroll-mt-24 bg-white py-section" aria-labelledby="contact-heading">
    <div class="site-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
            <SectionHeading id="contact-heading" eyebrow="Let's talk technology" title="Visit us in Erode" description="Drop by the store or contact our team for product and service enquiries." />
            <address class="mt-7 space-y-4 text-base text-brand-muted not-italic">
                <p class="font-semibold text-brand-navy">{site.name}</p>
                <p>{businessAddress}</p>
                <p><span class="font-semibold text-brand-navy">Opening hours:</span> {businessHoursLabel}</p>
                <p><a href={phoneUrl} class="inline-flex min-h-11 items-center hover:text-brand-blue">{businessPhone}</a><span class="mx-3 text-slate-300" aria-hidden="true">/</span><a href={secondaryPhoneUrl} class="inline-flex min-h-11 items-center hover:text-brand-blue">{secondaryBusinessPhone}</a></p>
                <p><a href={'mailto:' + site.email} class="inline-flex min-h-11 items-center break-all hover:text-brand-blue">{site.email}</a></p>
            </address>
            <ContactActions class="mt-6" />
            <Button href={googleMapsDirectionsUrl} target="_blank" variant="ghost" class="mt-3">Get Directions</Button>
        </div>
        <Map embedded />
    </div>
</section>
