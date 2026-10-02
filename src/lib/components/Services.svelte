<script lang="ts">
    import { getWhatsAppUrl } from '$lib/contact';
    import { isBookingOpen } from '$lib/store';

    const services = [
        {
            title: 'Laptop & PC Service',
            description: 'Diagnostics, repairs, OS installation and performance upgrades.',
            icon: 'fa-laptop-medical',
            booking: true
        },
        {
            title: 'Computer Sales',
            description: 'Desktops, components and systems matched to your requirements.',
            icon: 'fa-computer',
            booking: false
        },
        {
            title: 'Printer Sales & Service',
            description: 'Printer supply, maintenance, ink and toner support.',
            icon: 'fa-print',
            booking: false
        },
        {
            title: 'Networking',
            description: 'Reliable wired and wireless network setup and support.',
            icon: 'fa-network-wired',
            booking: false
        },
        {
            title: 'CCTV Solutions',
            description: 'CCTV consultation, installation and maintenance.',
            icon: 'fa-video',
            booking: false
        },
        {
            title: 'IT Support & AMC',
            description: 'Ongoing IT support and maintenance for business systems.',
            icon: 'fa-headset',
            booking: false
        }
    ];

    function quoteUrl(service: string) {
        return getWhatsAppUrl(`Hi Arschis Computers, I would like a quote for ${service}.`);
    }
</script>

<section id="services" class="scroll-mt-20 bg-white px-3 py-14 sm:px-6 sm:py-20" aria-labelledby="services-heading">
    <div class="mx-auto max-w-7xl">
        <div class="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
            <p class="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#D92323]">Sales, service and support</p>
            <h2 id="services-heading" class="text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">Computer & IT Services</h2>
        </div>

        <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {#each services as service}
                <article class="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                    <i class="fa-solid {service.icon} mb-3 text-2xl text-[#D92323] sm:text-3xl" aria-hidden="true"></i>
                    <h3 class="text-base font-bold leading-tight text-[#0B1F3A] sm:text-xl">{service.title}</h3>
                    <p class="mt-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">{service.description}</p>

                    {#if service.booking}
                        <button onclick={() => $isBookingOpen = true} class="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#D92323] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-red-700 sm:text-sm">
                            Book a Service
                        </button>
                    {:else}
                        <a href={quoteUrl(service.title)} target="_blank" rel="noopener noreferrer" aria-label={`Get a quote for ${service.title} on WhatsApp`} class="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#D92323] px-3 py-2 text-xs font-bold text-[#D92323] transition-colors hover:bg-red-50 sm:text-sm">
                            Get a Quote
                        </a>
                    {/if}
                </article>
            {/each}
        </div>
    </div>
</section>
