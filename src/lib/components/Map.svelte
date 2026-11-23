<script lang="ts">
    import { googleMapsEmbedUrl } from '$lib/location';
    let { embedded = false }: { embedded?: boolean } = $props();
</script>

<section id="location" class={embedded ? 'min-w-0 self-stretch' : 'scroll-mt-20 bg-white px-4 pt-4 pb-14 sm:pt-6 sm:pb-20'} aria-label="Arschis Computers location map">
    <div class={embedded ? 'h-full min-h-[340px]' : 'mx-auto max-w-7xl'}>
        {#if !embedded}<div class="text-center mb-10">
            <h2 id="location-heading" class="text-3xl font-extrabold text-brand-navy sm:text-4xl">Find Us in Erode</h2>
            <div class="w-24 h-1 bg-brand-blue mx-auto mt-4 rounded-full"></div>
        </div>{/if}
        <div class="h-full overflow-hidden rounded-2xl border border-brand-border bg-brand-neutral">
            <iframe src={googleMapsEmbedUrl} class={embedded ? 'h-full min-h-[340px] w-full' : 'h-[280px] w-full sm:h-[360px]'} style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map showing Arschis Computers in Erode"></iframe>
        </div>
    </div>
</section>
