<script lang="ts">
    import { onMount } from 'svelte';

    let placeData: any = $state(null);
    let loading = $state(true);
    let error = $state(false);

    // Mobile Carousel State
    let currentIndex = $state(0);

    onMount(async () => {
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

<section class="pt-16 pb-0 bg-white relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
                <div class="flex md:overflow-x-auto gap-6 md:pb-6 custom-scrollbar md:snap-x md:snap-mandatory">
                    {#each placeData.reviews.slice(0, 10) as review, i}
                        <!-- Fixed width on desktop (md:w-[360px]) forces them into a single scrolling row -->
                        <div class="{i === currentIndex ? 'block' : 'hidden'} md:block w-full md:w-[360px] shrink-0 md:snap-start bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            
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
                    class="md:hidden absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all z-10"
                    aria-label="Previous Review"
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button 
                    onclick={nextReview} 
                    class="md:hidden absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-slate-900 active:scale-95 transition-all z-10"
                    aria-label="Next Review"
                >
                    <i class="fa-solid fa-chevron-right"></i>
                </button>

            </div>

            <!-- View All CTA -->
            {#if placeData.googleMapsUrl}
                <div class="mt-6 text-center">
                    <a href={placeData.googleMapsUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold rounded-lg transition-colors">
                        <i class="fa-brands fa-google text-[#4285F4]"></i>
                        View all reviews on Google
                    </a>
                </div>
            {/if}
        {/if}
    </div>
</section>

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