<script lang="ts">
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    const steps = [
        { title: 'Contact', copy: 'Tell us about your device and the help you need.', icon: 'fa-comments' },
        { title: 'Diagnosis', copy: 'Discuss the issue, service options and estimate.', icon: 'fa-magnifying-glass' },
        { title: 'Service / Repair', copy: 'Proceed with the agreed service or repair.', icon: 'fa-screwdriver-wrench' },
        { title: 'Handover', copy: 'Collect your device and discuss the work completed.', icon: 'fa-handshake' }
    ];
</script>
<section class="border-b border-brand-border bg-white py-section" aria-labelledby="process-heading">
    <div class="site-container">
        <SectionHeading id="process-heading" title="Service, Step by Step" description="A clear path from the first conversation to handover." align="center" />
        <ol class="mt-10 grid grid-cols-1 gap-7 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {#each steps as step}<li class="relative min-w-0 border-t-2 border-blue-100 pt-6"><i class="fa-solid {step.icon} mb-4 text-2xl text-brand-blue" aria-hidden="true"></i><h3 class="text-lg font-semibold text-brand-navy">{step.title}</h3><p class="mt-3 text-sm leading-relaxed text-brand-muted">{step.copy}</p></li>{/each}
        </ol>
    </div>
</section>
