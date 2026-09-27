<script lang="ts">
    import { onMount } from 'svelte';
    
    let reviews: any[] = $state([]);
    let loading = $state(true);
    let carouselRef: HTMLDivElement;

   onMount(async () => {
        const reviewsApiUrl = '/api/reviews';
        try {
            const res = await fetch(reviewsApiUrl);
            const data = await res.json();
            
            // ADD THIS LINE TO SEE EXACTLY WHAT GOOGLE IS SAYING:
            console.log("GOOGLE API RESPONSE:", data);
            
            if (!data.error && data.length > 0) {
                reviews = data.filter((r: any) => r.rating >= 4); 
            }
        } catch (e) {
            console.error('Error fetching reviews:', e);
        } finally {
            loading = false;
        }
    });

    function scroll(direction: 'left' | 'right') {
        if (!carouselRef) return;
        const scrollAmount = 320;
        carouselRef.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }

    // Translates Google's UNIX timestamp into a readable date (e.g., Sep 27, 2026)
    function formatDate(unixTime: number) {
        return new Date(unixTime * 1000).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
</script>

<section id="testimonials" class="py-16 px-4 max-w-7xl mx-auto overflow-hidden bg-white">
    <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-slate-900">What Our Customers Say</h3>
        <div class="w-24 h-1 bg-[#DC2626] mx-auto mt-4 rounded-full"></div>
    </div>
    
    <div class="relative px-2 sm:px-8">
        <button onclick={() => scroll('left')} class="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-white text-[#1E3A8A] shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#DC2626] hover:text-white transition-colors border border-slate-200" aria-label="Scroll left">
            <i class="fa-solid fa-chevron-left"></i>
        </button>

        <!-- Dynamic Carousel Container -->
        <div bind:this={carouselRef} class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4">
            {#if loading}
                <div class="w-full text-center text-slate-500 py-8">
                    <i class="fa-solid fa-spinner fa-spin text-3xl mb-3 text-[#DC2626]"></i>
                    <p>Loading daily reviews...</p>
                </div>
            {:else if reviews.length === 0}
                <p class="w-full text-center text-slate-500">Check out our 5-star reviews on Google Maps!</p>
            {:else}
                {#each reviews as review, i}
                    <div class="w-[85vw] sm:w-[300px] md:w-[320px] snap-center bg-white p-6 rounded-xl shadow-md border-t-4 {i % 2 === 0 ? 'border-[#DC2626]' : 'border-[#1E3A8A]'} shrink-0 flex flex-col justify-between whitespace-normal">
                        <div>
                            <div class="text-[#FFD700] mb-3 text-lg">
                                {#each Array(review.rating) as _}
                                    <i class="fa-solid fa-star"></i>
                                {/each}
                            </div>
                            <p class="text-slate-600 text-sm mb-4 italic leading-relaxed break-words">"{review.text}"</p>
                        </div>
                        
                        <div class="mt-auto flex items-center justify-between border-t border-slate-50 pt-4">
                            <h5 class="font-bold text-[#1E3A8A] flex items-center text-sm">
                                <img src={review.profile_photo_url} alt={review.author_name} class="w-8 h-8 rounded-full mr-2 shadow-sm" onerror={(e) => e.currentTarget.style.display='none'}> 
                                {review.author_name}
                            </h5>
                            
                            <!-- The dynamic formatted date is rendered here -->
                            <span class="text-xs text-slate-400 font-medium">{formatDate(review.time)}</span>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        <button onclick={() => scroll('right')} class="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-white text-[#1E3A8A] shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#DC2626] hover:text-white transition-colors border border-slate-200" aria-label="Scroll right">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    </div>
</section>