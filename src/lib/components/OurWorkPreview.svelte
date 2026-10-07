<script lang="ts">
    import { getSanityImageUrl, type GalleryLoadResult } from '$lib/gallery';
    let { data }: { data: GalleryLoadResult } = $props();
</script>

{#if data.items.length}
    <section class="bg-white px-4 py-14 sm:py-20" aria-labelledby="work-heading">
        <div class="mx-auto max-w-7xl">
            <div class="mb-8 flex items-end justify-between gap-4"><div><h2 id="work-heading" class="text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">Our Work</h2><p class="mt-2 text-slate-600">A look at recent projects from Arschis Computers.</p></div><a href="/gallery" class="hidden min-h-11 items-center rounded-lg border-2 border-[#0B1F3A] px-5 py-2 font-bold text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A] hover:text-white sm:inline-flex">View Gallery</a></div>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {#each data.items as item, index (item._id)}
                    <a href="/gallery" class="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div class="aspect-[4/3] bg-slate-100">{#if item.image}<img src={getSanityImageUrl(item.image, 800)} alt={item.image.alt || item.title} width={item.image.asset?.metadata?.dimensions?.width || 1200} height={item.image.asset?.metadata?.dimensions?.height || 900} loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />{:else}<div class="flex h-full items-center justify-center bg-[#0B1F3A] text-white"><i class="fa-solid fa-circle-play text-4xl" aria-hidden="true"></i></div>{/if}</div><div class="p-4"><div class="text-xs font-bold uppercase tracking-wide text-[#D92323]">{item.category}</div><h3 class="mt-1 font-extrabold text-[#0B1F3A]">{item.title}</h3></div></a>
                {/each}
            </div>
            <a href="/gallery" class="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-[#0B1F3A] px-6 py-3 font-bold text-[#0B1F3A] transition-colors hover:bg-[#0B1F3A] hover:text-white sm:hidden">View Gallery</a>
        </div>
    </section>
{/if}
