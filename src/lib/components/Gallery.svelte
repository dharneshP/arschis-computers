<script lang="ts">
    import Dialog from '$lib/components/ui/Dialog.svelte';
    import { galleryCategories, getSanityImageUrl, type GalleryItem, type GalleryLoadResult } from '$lib/gallery';

    let { data }: { data: GalleryLoadResult } = $props();
    let activeCategory = $state('All');
    let selectedItem = $state<GalleryItem | null>(null);
    let playingVideo = $state<string | null>(null);
    let filteredItems = $derived(activeCategory === 'All' ? data.items : data.items.filter((item) => item.category === activeCategory));

    const videoItem = $derived(data.items.find((item) => item._id === playingVideo));

    function embedUrl(url: string) {
        const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&/]+)/);
        if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0`;
        const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        return vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : url;
    }

    function openItem(item: GalleryItem) {
        selectedItem = null;
        playingVideo = null;
        if (item.mediaType === 'image') selectedItem = item;
        else playingVideo = item._id;
    }
</script>

<section id="gallery" class="bg-white px-4 py-section" aria-labelledby="gallery-heading">
    <div class="mx-auto max-w-7xl">
        <div class="mb-10 text-center">
            <i class="fa-solid fa-images mb-5 text-4xl text-brand-blue" aria-hidden="true"></i>
            <h1 id="gallery-heading" class="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">Our Work Gallery</h1>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">Genuine computer sales, service, networking and installation work from Arschis Computers.</p>
        </div>

        {#if data.status === 'error'}
            <div class="rounded-xl border border-red-100 bg-red-50 p-8 text-center" role="alert"><p class="font-bold text-brand-navy">Gallery content is temporarily unavailable.</p><p class="mt-2 text-slate-600">Please try again shortly or contact Arschis Computers.</p></div>
        {:else if data.items.length === 0}
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center"><p class="font-bold text-brand-navy">Our work gallery is being updated.</p><p class="mt-2 text-slate-600">New service and installation projects will appear here soon.</p><a href="/#contact" class="mt-5 inline-flex min-h-11 items-center rounded-lg bg-brand-blue px-5 py-3 font-bold text-white hover:bg-brand-blue-dark">Contact Arschis Computers</a></div>
        {:else}
            <div class="mb-8 flex flex-wrap justify-center gap-2" aria-label="Filter gallery by category">
                {#each galleryCategories as category}
                    <button type="button" class:!bg-brand-blue={activeCategory === category} class:!text-white={activeCategory === category} class="min-h-11 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-brand-navy transition-colors hover:border-brand-blue hover:text-brand-blue" aria-pressed={activeCategory === category} onclick={() => activeCategory = category}>{category}</button>
                {/each}
            </div>
            {#if filteredItems.length}
                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {#each filteredItems as item, index (item._id)}
                        <article class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div class="relative aspect-[4/3] bg-slate-100">
                                {#if item.mediaType === 'image' && item.image}
                                    <button type="button" class="group block h-full w-full" aria-label={`Open ${item.title}`} onclick={() => openItem(item)}>
                                        <img src={getSanityImageUrl(item.image, 900)} srcset={`${getSanityImageUrl(item.image, 480)} 480w, ${getSanityImageUrl(item.image, 900)} 900w`} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" alt={item.image.alt || item.title} width={item.image.asset?.metadata?.dimensions?.width || 1200} height={item.image.asset?.metadata?.dimensions?.height || 900} loading={index < 3 ? 'eager' : 'lazy'} class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                        <span class="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/25 group-hover:opacity-100"><i class="fa-solid fa-expand text-2xl" aria-hidden="true"></i></span>
                                    </button>
                                {:else}
                                    <button type="button" class="group relative block h-full w-full" aria-label={`Play ${item.title}`} onclick={() => openItem(item)}>
                                        {#if item.videoThumbnail}
                                            <img src={getSanityImageUrl(item.videoThumbnail, 900)} alt={item.videoThumbnail.alt || item.title} width={item.videoThumbnail.asset?.metadata?.dimensions?.width || 1200} height={item.videoThumbnail.asset?.metadata?.dimensions?.height || 900} loading="lazy" class="h-full w-full object-cover" />
                                        {:else}<div class="h-full w-full bg-brand-navy"></div>{/if}
                                        <span class="absolute inset-0 flex items-center justify-center bg-black/25 text-white"><i class="fa-solid fa-circle-play text-5xl transition group-hover:scale-110" aria-hidden="true"></i></span>
                                    </button>
                                {/if}
                            </div>
                            <div class="p-5"><div class="mb-2 text-xs font-bold uppercase tracking-wide text-brand-blue">{item.category}</div><h2 class="text-lg font-extrabold text-brand-navy">{item.title}</h2>{#if item.description}<p class="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>{/if}</div>
                        </article>
                    {/each}
                </div>
            {:else}<p class="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">No gallery items in this category yet.</p>{/if}
        {/if}
    </div>
</section>

<Dialog open={!!selectedItem} onclose={() => selectedItem = null} title={selectedItem?.title || 'Image preview'} variant="wide">
    {#if selectedItem}
        <img src={getSanityImageUrl(selectedItem.image, 1800)} alt={selectedItem.image?.alt || selectedItem.title} class="mx-auto max-h-[65dvh] w-full rounded-lg object-contain" />
        {#if selectedItem.description}<p class="mt-4 text-brand-muted">{selectedItem.description}</p>{/if}
    {/if}
</Dialog>
<Dialog open={!!videoItem?.video} onclose={() => playingVideo = null} title={videoItem?.title || 'Video preview'} variant="wide">
    {#if videoItem?.video}<div class="aspect-video"><iframe src={embedUrl(videoItem.video)} title={videoItem.title} class="h-full w-full rounded-lg" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>{/if}
</Dialog>
