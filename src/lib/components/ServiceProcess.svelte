<script lang="ts">
    const steps = [
        { number: '01', title: 'Tell Us Your Problem', icon: 'fa-comments' },
        { number: '02', title: 'Diagnosis & Estimate', icon: 'fa-magnifying-glass' },
        { number: '03', title: 'Repair / Service', icon: 'fa-screwdriver-wrench' },
        { number: '04', title: 'Testing & Delivery', icon: 'fa-circle-check' }
    ];
</script>

<section class="bg-white px-4 py-14 sm:py-20" aria-labelledby="process-heading">
    <div class="mx-auto max-w-7xl">
        <h2 id="process-heading" class="mb-10 text-center text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">How Our Service Works</h2>
        <ol class="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {#each steps as step, index}
                <li class="relative rounded-xl border border-slate-200 bg-white p-4 text-center sm:p-6">
                    <span class="text-sm font-black tracking-wider text-[#D92323]">{step.number}</span>
                    <i class="fa-solid {step.icon} my-3 block text-2xl text-[#0B1F3A]" aria-hidden="true"></i>
                    <h3 class="text-sm font-bold leading-snug text-[#172033] sm:text-lg">{step.title}</h3>
                    {#if index < steps.length - 1}
                        <i class="fa-solid fa-arrow-right absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-[#F5C400] p-2 text-xs text-[#071426] lg:block" aria-hidden="true"></i>
                    {/if}
                </li>
            {/each}
        </ol>
    </div>
</section>
