<script lang="ts">
    // 1. Import Svelte's built-in slide animation
    import { slide } from 'svelte/transition';

    // 2. Use $state() so the website knows to react when a button is clicked
    let activeIndex = $state(-1);

    const faqs = [
        {
            q: "Will my data be safe during the repair?",
            a: "Absolutely. We adhere to a strict 100% data security policy. Your personal files remain completely private and untouched during hardware repairs. However, we always recommend backing up your data if possible before any major service."
        },
        {
            q: "Do you provide a warranty on replaced parts?",
            a: "Yes! All genuine replacement parts come with their official manufacturer warranty. We also provide our own service guarantee on our repair workmanship for your peace of mind."
        },
        {
            q: "How long does a typical laptop repair take?",
            a: "Standard repairs like screen or battery replacements are usually completed within 24 hours. Complex chip-level motherboard repairs may take 2-3 days depending on the specific issue."
        },
    ];
</script>

<section id="faq" class="pt-8 pb-16 sm:pt-10 sm:pb-24 bg-white border-t border-slate-100">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
            <h1 class="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">Frequently Asked Questions</h1>
            <p class="mt-4 text-lg text-slate-600">Everything you need to know about our repair and installation services.</p>
        </div>

        <div class="space-y-4">
            {#each faqs as faq, i}
                <div class="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-all duration-300">
                    <button 
                        id="faq-question-{i}"
                        class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-100 transition-colors"
                        onclick={() => activeIndex = activeIndex === i ? -1 : i}
                        aria-expanded={activeIndex === i}
                        aria-controls="faq-answer-{i}"
                    >
                        <span class="font-bold text-slate-800 sm:text-lg">{faq.q}</span>
                        <i class="fa-solid fa-chevron-down text-slate-400 transition-transform duration-300 {activeIndex === i ? 'rotate-180' : ''}" aria-hidden="true"></i>
                    </button>
                    
                    {#if activeIndex === i}
                        <!-- 3. Add transition:slide here for a butter-smooth open/close effect -->
                        <div id="faq-answer-{i}" role="region" aria-labelledby="faq-question-{i}" transition:slide={{ duration: 300 }} class="px-6 pb-5 text-slate-600">
                            {faq.a}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
        
    </div>
</section>
