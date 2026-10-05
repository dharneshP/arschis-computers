<script lang="ts">
    import { googleMapsEmbedUrl } from '$lib/location';
</script>

<section id="location" class="scroll-mt-20 bg-white px-4 pt-4 pb-14 sm:pt-6 sm:pb-20" aria-labelledby="location-heading">
    <div class="mx-auto max-w-7xl">
        <div class="text-center mb-10">
            <h2 id="location-heading" class="text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">Find Us in Erode</h2>
            <div class="w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <iframe src={googleMapsEmbedUrl} class="h-[280px] w-full sm:h-[360px]" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map showing Arschis Computers in Erode"></iframe>
        </div>
    </div>
</section>