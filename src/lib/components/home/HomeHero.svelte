<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { isBookingOpen } from '$lib/store';
</script>

<section class="home-hero relative isolate overflow-hidden text-white" aria-labelledby="hero-heading">
    <div class="site-container relative grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-20">
        <div class="hero-copy relative z-10 min-w-0">
            <p class="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-blue-200 uppercase"><span class="h-px w-8 bg-blue-400" aria-hidden="true"></span> Computers. Service. Support.</p>
            <h1 id="hero-heading" class="max-w-xl text-[clamp(2.25rem,4.8vw,4.25rem)] font-bold leading-[1.1] tracking-tight">Your Trusted Computer Partner <span class="text-blue-300">in Erode</span></h1>
            <p class="mt-6 max-w-lg text-base leading-relaxed text-slate-200 sm:text-lg">Find the right computer. Keep it running at its best. Explore laptops, desktops and practical IT support, all in one place.</p>
            <div class="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
                <Button href="/store" class="min-h-12 px-6 text-base">Shop Computers</Button>
                <Button onclick={() => $isBookingOpen = true} variant="light" class="min-h-12 px-6 text-base" aria-haspopup="dialog">Book a Service</Button>
            </div>
            <div class="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-5 text-sm text-slate-200">
                <span><i class="fa-solid fa-laptop mr-2 text-blue-300" aria-hidden="true"></i> New, used & refurbished</span>
                <span><i class="fa-solid fa-screwdriver-wrench mr-2 text-blue-300" aria-hidden="true"></i> Sales & service</span>
            </div>
        </div>
        <div class="hero-visual relative min-w-0">
            <div class="absolute inset-8 rounded-full bg-blue-500/15 blur-3xl" aria-hidden="true"></div>
            <img src="/premium-hero-1200.webp" srcset="/premium-hero-600.webp 600w, /premium-hero-900.webp 900w, /premium-hero-1200.webp 1200w" sizes="(min-width: 1280px) 580px, (min-width: 1024px) 48vw, 100vw" alt="Laptop and desktop computer setup with blue studio lighting" width="1200" height="800" fetchpriority="high" loading="eager" decoding="async" class="relative aspect-[3/2] w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10" />
            <p class="relative mx-4 -mt-7 flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-[#102a4a]/95 px-4 py-3 text-sm shadow-xl backdrop-blur sm:mx-8">
                <span class="font-semibold">For work. For home. For you.</span><span class="text-xs text-blue-200">Arschis Computers</span>
            </p>
        </div>
    </div>
</section>

<style>
    .home-hero { background: radial-gradient(ellipse at 85% 30%, #194f9438, transparent 65%), linear-gradient(115deg, #071426, #0b1f3a 55%, #103668); }
    @media (prefers-reduced-motion: no-preference) {
        .hero-copy { animation: enter 450ms ease-out both; }
        .hero-visual { animation: enter 550ms 80ms ease-out both; }
        @keyframes enter { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    }
</style>
