<script lang="ts">
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    import { getOptimizedProductImage } from '$lib/products';
    import type { StoreCategorySlug } from '$lib/store-categories';
    let { images = {} }: { images?: Partial<Record<StoreCategorySlug, string>> } = $props();
    let failedImages = $state<string[]>([]);
    const categories = [
        { slug: 'laptops', label: 'Laptops', copy: 'Work, study & everyday life', icon: 'fa-laptop' },
        { slug: 'desktops', label: 'Desktops', copy: 'A setup that works for you', icon: 'fa-desktop' },
        { slug: 'monitors', label: 'Monitors', copy: 'More room for your ideas', icon: 'fa-display' },
        { slug: 'printers', label: 'Printers', copy: 'For home & office', icon: 'fa-print' }
    ] as const;
</script>

<section class="bg-white py-section" aria-labelledby="categories-heading">
    <div class="site-container">
        <SectionHeading id="categories-heading" title="Shop by Category" description="Find the right technology for the way you work." align="center" />
        <div class="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {#each categories as category}
                <a href={'/store/' + category.slug + '/'} class="group min-w-0 overflow-hidden rounded-card border border-brand-border bg-white p-4 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/40 sm:p-6">
                    <div class="mb-5 flex aspect-[16/10] items-center justify-center rounded-xl bg-brand-neutral p-3">
                        {#if images[category.slug] && !failedImages.includes(category.slug)}
                            <img src={getOptimizedProductImage(images[category.slug], 400)} srcset={`${getOptimizedProductImage(images[category.slug], 200)} 200w, ${getOptimizedProductImage(images[category.slug], 400)} 400w`} sizes="(min-width: 1024px) 260px, 45vw" width="400" height="250" alt={category.label + ' from our product catalogue'} loading="lazy" decoding="async" class="h-full w-full object-contain mix-blend-multiply" onerror={() => failedImages.push(category.slug)} />
                        {:else}<i class="fa-solid {category.icon} text-4xl text-brand-navy" aria-hidden="true"></i>{/if}
                    </div>
                    <h3 class="text-lg font-bold text-brand-navy sm:text-xl">{category.label}</h3>
                    <p class="mt-1 text-sm text-brand-muted">{category.copy}</p>
                    <span class="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-brand-blue">Explore {category.label}</span>
                </a>
            {/each}
        </div>
    </div>
</section>
