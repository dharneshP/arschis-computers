<script lang="ts">
    import { getSanityImageUrl, type GalleryLoadResult } from '$lib/gallery';
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    let { data }: { data: GalleryLoadResult } = $props();
</script>
<section class="bg-white py-section" aria-labelledby="work-heading">
    <div class="site-container">
        <div class="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><SectionHeading id="work-heading" eyebrow="From our workspace" title="Recent Work" description="Sales, service and installation work shared by our team." /><Button href="/gallery" variant="secondary" class="shrink-0">View Gallery</Button></div>
        {#if data.items.length}
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {#each data.items as item (item._id)}
                    {@const image = item.mediaType === 'video' ? item.videoThumbnail : item.image}
                    <a href="/gallery" class="group min-w-0 overflow-hidden rounded-card border border-brand-border bg-white"><div class="aspect-[4/3] overflow-hidden bg-brand-neutral">{#if image?.asset?.url}<img src={getSanityImageUrl(image, 800)} srcset={`${getSanityImageUrl(image, 400)} 400w, ${getSanityImageUrl(image, 800)} 800w`} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" alt={image.alt || item.title} width="800" height="600" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />{:else}<div class="flex h-full items-center justify-center text-brand-navy"><i class="fa-solid fa-circle-play text-4xl" aria-hidden="true"></i></div>{/if}</div><div class="p-5"><p class="text-xs font-semibold tracking-wide text-brand-blue uppercase">{item.category}</p><h3 class="mt-2 text-lg font-semibold text-brand-navy">{item.title}</h3></div></a>
                {/each}
            </div>
        {:else}
            <div class="rounded-card border border-dashed border-brand-border bg-brand-neutral px-6 py-10 text-center" role="status"><i class="fa-regular fa-images mb-4 text-3xl text-brand-blue" aria-hidden="true"></i><p class="font-semibold text-brand-navy">{data.status === 'error' ? 'Recent work is temporarily unavailable.' : 'Our work gallery is being updated.'}</p><p class="mt-2 text-sm text-brand-muted">{data.status === 'error' ? 'You can try the gallery again or contact our team.' : 'Published project photos will appear here when available.'}</p></div>
        {/if}
    </div>
</section>
