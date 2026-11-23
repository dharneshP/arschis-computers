<script lang="ts">
    import { isBookingOpen } from '$lib/store';
    import { getWhatsAppUrl } from '$lib/contact';
    import Button from '$lib/components/ui/Button.svelte';
    const services = [
        { id: 'service-laptop', title: 'Laptop Repair', copy: 'Power, display, keyboard and performance troubleshooting.', icon: 'fa-laptop-medical', href: '/laptop-service-erode/' },
        { id: 'service-pc', title: 'Desktop Service', copy: 'Diagnostics, Windows support and hardware troubleshooting.', icon: 'fa-desktop', href: '/computer-service-erode/' },
        { id: 'service-printer', title: 'Printer Service', copy: 'Setup, connectivity and common printing problems.', icon: 'fa-print', href: '/printer-service-erode/' },
        { id: 'service-upgrades', title: 'Computer Upgrades', copy: 'Discuss compatible RAM, SSD and system upgrades.', icon: 'fa-microchip', href: '/computer-service-erode/' }
    ];
</script>

<section id="services" class="scroll-mt-24 bg-brand-navy py-section text-white" aria-labelledby="services-heading">
    <div class="site-container">
        <div class="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div class="max-w-2xl"><p class="mb-3 text-sm font-semibold tracking-widest text-blue-200 uppercase">Care for your technology</p><h2 id="services-heading" class="text-heading font-bold tracking-tight">Your Computer Service Center</h2><p class="mt-4 text-base leading-relaxed text-slate-200">When your technology needs attention, talk to a local team. Tell us the issue and we'll discuss diagnosis and the next steps.</p></div>
            <Button onclick={() => $isBookingOpen = true} aria-haspopup="dialog" class="min-h-12 shrink-0 px-6">Book Service</Button>
        </div>
        <div class="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {#each services as service}
                <a id={service.id} href={service.href} class="group min-w-0 scroll-mt-24 rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-blue-300/60 hover:bg-white/10">
                    <i class="fa-solid {service.icon} mb-6 text-3xl text-blue-300" aria-hidden="true"></i>
                    <h3 class="text-lg font-semibold">{service.title}</h3><p class="mt-3 text-sm leading-relaxed text-slate-200">{service.copy}</p><span class="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-blue-200">Explore service</span>
                </a>
            {/each}
        </div>
        <div id="service-networking" class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm text-slate-200"><span>Also here for your business:</span><a href={getWhatsAppUrl('Hi Arschis Computers, I would like a quote for Networking.')} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center font-semibold text-blue-200 underline underline-offset-4">Networking</a><a href={getWhatsAppUrl('Hi Arschis Computers, I would like a quote for IT Support & AMC.')} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center font-semibold text-blue-200 underline underline-offset-4">IT Support & AMC</a><a href="/computer-sales-erode/" class="inline-flex min-h-11 items-center font-semibold text-blue-200 underline underline-offset-4">Computer Sales</a></div>
    </div>
</section>
