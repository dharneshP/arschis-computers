<script lang="ts">
    import ContactActions from '$lib/components/ContactActions.svelte';
    import { site, businessAddress, businessHoursLabel } from '$lib/site';
    import { googleMapsDirectionsUrl } from '$lib/location';
    import Button from '$lib/components/ui/Button.svelte';
</script>

<section id="contact" class="scroll-mt-24 border-t border-brand-border bg-brand-navy py-section" aria-labelledby="contact-heading">
    <div class="site-container grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
            <p class="mb-3 text-sm font-semibold tracking-widest text-blue-200 uppercase">Visit or get in touch</p>
            <h2 id="contact-heading" class="text-heading font-bold text-white">Need Computer or IT Service?</h2>
            <p class="mt-4 text-slate-200">Contact {site.name} for service and sales enquiries.</p>
            <address class="mt-5 space-y-2 text-base text-slate-200 not-italic"><p>{businessAddress}</p><p>{businessHoursLabel}</p><p><a class="break-all underline underline-offset-4 hover:text-white" href={'mailto:' + site.email}>{site.email}</a></p></address>
        </div>
        <div class="space-y-4">
            <ContactActions light />
            <Button href={googleMapsDirectionsUrl} target="_blank" variant="light">Get Directions</Button>
        </div>
    </div>
</section>
