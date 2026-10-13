<script lang="ts">
    import { onMount } from 'svelte';

    let placeData: any = $state(null);
    let loading = $state(true);
    let error = $state(false);

    // Mobile Carousel State
    let currentIndex = $state(0);

    let reviewsSection: HTMLElement;

    async function loadReviews() {
        try {
            const res = await fetch('/api/reviews');
            if (res.ok) {
                placeData = await res.json();
            } else {
                error = true;
            }
        } catch (e) {
            error = true;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                observer.disconnect();
                loadReviews();
            }
        }, { rootMargin: '400px 0px' });
        if (reviewsSection) observer.observe(reviewsSection);
        return () => observer.disconnect();
    });

    function nextReview() {
        if (placeData?.reviews && currentIndex < placeData.reviews.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Wrap around to start
        }
    }

    function prevReview() {
        if (placeData?.reviews && currentIndex > 0) {
            currentIndex--;
        } else if (placeData?.reviews) {
            currentIndex = placeData.reviews.length - 1; // Wrap around to end
        }
    }

    // Swipe navigation logic for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.changedTouches[0].screenX;
    }
    function handleTouchEnd(e: TouchEvent) {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextReview(); // Swipe left
        if (touchEndX - touchStartX > 50) prevReview(); // Swipe right
    }
</script>

<div bind:this={reviewsSection} class="min-w-0">
{#if placeData && !error && placeData.reviews?.length > 0}
<section class="min-w-0 overflow-x-clip bg-white pt-16 pb-0 relative">
    <div class="mx-auto min-w-0 max-w-7xl px-0 sm:px-6 lg:px-8">
        
        <!-- Header & Overall Rating -->
        <div class="text-center mb-12">
            <h2 class="text-3xl font-extrabold text-slate-900 mb-4">What Our Customers Say</h2>
            
            {#if loading}
                <div class="animate-pulse h-6 w-48 bg-slate-200 rounded mx-auto"></div>
            {:else if placeData && !error}
                <div class="flex items-center justify-center gap-3">
                    <span class="text-2xl font-bold text-slate-900">{placeData.rating}</span>
                    <div class="flex text-[#FFD700] text-xl">
                        {#each Array(5) as _, i}
                            <i class="fa-{i < Math.round(placeData.rating) ? 'solid' : 'regular'} fa-star"></i>
                        {/each}
                    </div>
                    <span class="text-sm text-slate-500 font-medium">({placeData.userRatingsTotal} Google Reviews)</span>
                </div>
            {/if}
        </div>

        <!-- Reviews Container -->
        {#if !loading && placeData?.reviews?.length > 0}
            <div 
                class="relative" 
                ontouchstart={handleTouchStart} 
                ontouchend={handleTouchEnd}
                role="region"
                aria-label="Reviews Carousel"
            >
                <!-- Desktop: Horizontal Scroll Row | Mobile: Single Item -->
                <div class="flex min-w-0 gap-6 md:overflow-x-auto md:pb-6 custom-scrollbar md:snap-x md:snap-mandatory">
                    {#each placeData.reviews.slice(0, 10) as review, i}
                        <!-- Fixed width on desktop (md:w-[360px]) forces them into a single scrolling row -->
                        <div class="{i === currentIndex ? 'block' : 'hidden'} md:block min-w-0 w-full shrink-0 break-words rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm transition-shadow hover:shadow-md md:w-[360px] md:snap-start">
                            
                            <!-- Reviewer Info -->
                            <div class="flex items-center gap-4 mb-4">
                                {#if review.profile_photo_url}
                                    <img src={review.profile_photo_url} alt={review.author_name} class="w-12 h-12 rounded-full object-cover" referrerpolicy="no-referrer" />
                                {:else}
                                    <div class="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                        <i class="fa-solid fa-user"></i>
                                    </div>
                                {/if}
                                
                                <div>
                                    <h4 class="font-bold text-slate-900 text-sm">{review.author_name}</h4>
                                    <div class="flex text-[#FFD700] text-xs mt-1">
                                        {#each Array(5) as _, starIndex}
                                            <i class="fa-{starIndex < review.rating ? 'solid' : 'regular'} fa-star"></i>
                                        {/each}
                                    </div>
                                </div>
                                <!-- Google Icon for Attribution -->
                                <i class="fa-brands fa-google text-slate-400 ml-auto"></i>
                            </div>

                            <!-- Review Text -->
                            <p class="text-slate-600 text-sm italic mb-4 line-clamp-4">
                                "{review.text}"
                            </p>

                            <!-- Date -->
                            <p class="text-xs text-slate-400 font-medium">
                                {review.relativePublishTimeDescription}
                            </p>
                        </div>
                    {/each}
                </div>

                <!-- Mobile Navigation Arrows (Hidden on Desktop) -->
                <button 
                    onclick={prevReview} 
                    class="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all hover:text-slate-900 active:scale-95 md:hidden"
                    aria-label="Previous Review"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button 
                    onclick={nextReview} 
                    class="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg transition-all hover:text-slate-900 active:scale-95 md:hidden"
                    aria-label="Next Review"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>

            </div>

            <!-- View All CTA -->
            {#if placeData.googleMapsUrl}
                <div class="mt-6 mb-6 text-center md:mb-8">
                    <a href={placeData.googleMapsUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold rounded-lg transition-colors">
                        <i class="fa-brands fa-google text-[#4285F4]"></i>
                        View all reviews on Google
                    </a>
                </div>
            {/if}
        {/if}
    </div>
</section>
{/if}
</div>

<style>
    /* Custom thin scrollbar for the horizontal desktop reviews */
    .custom-scrollbar::-webkit-scrollbar {
        height: 6px; 
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent; 
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #cbd5e1; 
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #94a3b8; 
    }
</style>
