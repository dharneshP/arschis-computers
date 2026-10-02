<script lang="ts">
    import { onMount } from 'svelte';
    import { galleryCategories, getSanityImageUrl, type GalleryItem, type GalleryLoadResult } from '$lib/gallery';

    let { data }: { data: GalleryLoadResult } = $props();
    let activeCategory = $state('All');
    let selectedItem = $state<GalleryItem | null>(null);
    let playingVideo = $state<string | null>(null);
    let filteredItems = $derived(activeCategory === 'All' ? data.items : data.items.filter((item) => item.category === activeCategory));

    onMount(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') selectedItem = null;
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    });

    function embedUrl(url: string) {
        const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^?&/]+)/);
        if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?rel=0`;
        const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        return vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : url;
    }

    function openItem(item: GalleryItem) {
        if (item.mediaType === 'image') selectedItem = item;
        else playingVideo = item._id;
    }
</script>

<section id="gallery" class="bg-white px-4 py-14 sm:py-20" aria-labelledby="gallery-heading">
    <div class="mx-auto max-w-7xl">
        <div class="mb-10 text-center">
            <i class="fa-solid fa-images mb-5 text-4xl text-[#D92323]" aria-hidden="true"></i>
            <h1 id="gallery-heading" class="text-3xl font-extrabold tracking-tight text-[#0B1F3A] sm:text-4xl">Our Work Gallery</h1>
            <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">Genuine computer sales, service, networking and CCTV work from Arschis Computers.</p>
        </div>

        {#if data.status === 'error'}
            <div class="rounded-xl border border-red-100 bg-red-50 p-8 text-center" role="alert"><p class="font-bold text-[#0B1F3A]">Gallery content is temporarily unavailable.</p><p class="mt-2 text-slate-600">Please try again shortly or contact Arschis Computers.</p></div>
        {:else if data.items.length === 0}
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center"><p class="font-bold text-[#0B1F3A]">Our work gallery is being updated.</p><p class="mt-2 text-slate-600">New service and installation projects will appear here soon.</p><a href="/#contact" class="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[#D92323] px-5 py-3 font-bold text-white hover:bg-red-700">Contact Arschis Computers</a></div>
        {:else}
            <div class="mb-8 flex flex-wrap justify-center gap-2" aria-label="Filter gallery by category">
                {#each galleryCategories as category}
                    <button type="button" class:!bg-[#D92323]={activeCategory === category} class:!text-white={activeCategory === category} class="min-h-11 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0B1F3A] transition-colors hover:border-[#D92323] hover:text-[#D92323]" aria-pressed={activeCategory === category} onclick={() => activeCategory = category}>{category}</button>
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
                                        {:else}<div class="h-full w-full bg-[#0B1F3A]"></div>{/if}
                                        <span class="absolute inset-0 flex items-center justify-center bg-black/25 text-white"><i class="fa-solid fa-circle-play text-5xl transition group-hover:scale-110" aria-hidden="true"></i></span>
                                    </button>
                                {/if}
                            </div>
                            <div class="p-5"><div class="mb-2 text-xs font-bold uppercase tracking-wide text-[#D92323]">{item.category}</div><h2 class="text-lg font-extrabold text-[#0B1F3A]">{item.title}</h2>{#if item.description}<p class="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>{/if}</div>
                        </article>
                    {/each}
                </div>
            {:else}<p class="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-600">No gallery items in this category yet.</p>{/if}
        {/if}
    </div>
</section>

{#if selectedItem}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="presentation" onclick={(event) => event.target === event.currentTarget && (selectedItem = null)}>
        <div class="relative max-h-[90vh] max-w-5xl overflow-auto rounded-xl bg-white p-3 shadow-2xl" role="dialog" aria-modal="true" aria-label={selectedItem.title}>
            <button type="button" class="absolute right-5 top-5 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/70 text-white" aria-label="Close image lightbox" onclick={() => selectedItem = null}><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
            <img src={getSanityImageUrl(selectedItem.image, 1800)} alt={selectedItem.image?.alt || selectedItem.title} class="max-h-[70vh] w-auto rounded-lg object-contain" />
            <div class="px-2 pb-2 pt-4"><h2 class="text-xl font-extrabold text-[#0B1F3A]">{selectedItem.title}</h2>{#if selectedItem.description}<p class="mt-2 text-slate-600">{selectedItem.description}</p>{/if}</div>
        </div>
    </div>
{/if}

{#if playingVideo}
    {@const videoItem = data.items.find((item) => item._id === playingVideo)}
    {#if videoItem?.video}
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" role="presentation" onclick={(event) => event.target === event.currentTarget && (playingVideo = null)}>
            <div class="relative w-full max-w-4xl rounded-xl bg-black p-2" role="dialog" aria-modal="true" aria-label={videoItem.title}>
                <button type="button" class="absolute -right-2 -top-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-[#0B1F3A]" aria-label="Close video" onclick={() => playingVideo = null}><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
                <div class="aspect-video"><iframe src={embedUrl(videoItem.video)} title={videoItem.title} class="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            </div>
        </div>
    {/if}
{/if}
