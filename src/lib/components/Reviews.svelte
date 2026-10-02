<script lang="ts">
    import { onMount } from 'svelte';
    import { getGoogleReviewData, type GoogleReview, type GoogleReviewLoadStatus } from '$lib/google-reviews';
    import { googleMapsUrl } from '$lib/location';

    let reviews: GoogleReview[] = $state([]);
    let reviewsUrl = $state(googleMapsUrl);
    let status: GoogleReviewLoadStatus | 'loading' = $state('loading');
    let visibleCount = $state(1);
    let currentPage = $state(0);
    let expandedReview = $state<number | null>(null);
    let touchStartX = 0;

    const pageCount = $derived(Math.max(1, Math.ceil(reviews.length / visibleCount)));
    const reviewPages = $derived(
        Array.from({ length: pageCount }, (_, page) => reviews.slice(page * visibleCount, (page + 1) * visibleCount))
    );
    const canGoPrevious = $derived(currentPage > 0);
    const canGoNext = $derived(currentPage < pageCount - 1);

    onMount(() => {
        const updateVisibleCount = () => {
            visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            currentPage = Math.min(currentPage, Math.max(0, Math.ceil(reviews.length / visibleCount) - 1));
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);

        void getGoogleReviewData().then((data) => {
            reviews = data.reviews.filter((review) => review.rating >= 4 && review.text).slice(0, 5);
            reviewsUrl = data.googleMapsUrl || googleMapsUrl;
            status = reviews.length ? 'success' : data.status === 'error' ? 'error' : 'empty';
        });

        return () => window.removeEventListener('resize', updateVisibleCount);
    });

    function formatDate(unixTime: number) {
        return new Date(unixTime * 1000).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function goToPage(page: number) {
        currentPage = Math.max(0, Math.min(page, pageCount - 1));
        expandedReview = null;
    }

    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.changedTouches[0]?.clientX ?? 0;
    }

    function handleTouchEnd(event: TouchEvent) {
        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
        const distance = touchEndX - touchStartX;
        if (Math.abs(distance) < 50) return;
        goToPage(currentPage + (distance < 0 ? 1 : -1));
    }
</script>

<section id="testimonials" class="bg-[#F5F7FA] px-4 py-14 sm:py-20" aria-labelledby="reviews-heading">
    <div class="mx-auto max-w-7xl">
        <div class="mb-10 text-center">
            <h2 id="reviews-heading" class="text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">What Our Customers Say</h2>
            <p class="mt-2 text-slate-600">Recent feedback provided through Google.</p>
        </div>

        {#if status === 'loading'}
            <div class="grid min-h-[18rem] gap-5 md:grid-cols-3" aria-live="polite" aria-label="Loading customer reviews">
                {#each Array(3) as _}
                    <div class="animate-pulse rounded-xl border border-slate-200 bg-white p-6" aria-hidden="true">
                        <div class="h-5 w-2/5 rounded bg-slate-200"></div>
                        <div class="mt-5 h-4 rounded bg-slate-200"></div>
                        <div class="mt-3 h-4 rounded bg-slate-200"></div>
                        <div class="mt-3 h-4 w-3/4 rounded bg-slate-200"></div>
                    </div>
                {/each}
                <span class="sr-only">Loading customer reviews…</span>
            </div>
        {:else if reviews.length}
            <div class="relative" role="region" aria-roledescription="carousel" aria-label="Customer reviews">
                <div class="overflow-hidden" role="group" aria-label="Swipe through customer reviews" ontouchstart={handleTouchStart} ontouchend={handleTouchEnd}>
                    <div class="flex transition-transform duration-300 ease-out" style={`transform: translateX(-${currentPage * 100}%);`}>
                        {#each reviewPages as page, pageIndex}
                            <div class="grid min-w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {#each page as review, pageItemIndex}
                                    {@const index = pageIndex * visibleCount + pageItemIndex}
                                    <article class="flex min-h-[18rem] flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm" aria-label={`Review ${index + 1} of ${reviews.length}`}>
                        <div class="mb-3 text-[#F5C400]" aria-label={`${review.rating} out of 5 stars`}>
                            {#each Array(review.rating) as _}
                                <i class="fa-solid fa-star" aria-hidden="true"></i>
                            {/each}
                        </div>
                        <p class={`${expandedReview === index ? '' : 'line-clamp-5'} flex-1 text-sm leading-relaxed text-slate-600`}>“{review.text}”</p>
                        {#if review.text.length > 300}
                            <button type="button" class="mt-2 self-start text-sm font-bold text-[#D92323] hover:underline" onclick={() => expandedReview = expandedReview === index ? null : index}>
                                {expandedReview === index ? 'Show less' : 'Read more'}
                            </button>
                        {/if}
                        <div class="mt-5 border-t border-slate-100 pt-4">
                            <strong class="block text-sm text-[#0B1F3A]">{review.author_name}</strong>
                            <span class="text-xs text-slate-500">{formatDate(review.time)} · Google review</span>
                        </div>
                                    </article>
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
                {#if pageCount > 1}
                    <div class="mt-6 flex items-center justify-center gap-4">
                        <button type="button" class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[#0B1F3A] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous reviews" disabled={!canGoPrevious} onclick={() => goToPage(currentPage - 1)}>
                            <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
                        </button>
                        <span class="min-w-14 text-center text-sm font-bold text-slate-600" aria-live="polite">{currentPage + 1} / {pageCount}</span>
                        <button type="button" class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-[#0B1F3A] transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next reviews" disabled={!canGoNext} onclick={() => goToPage(currentPage + 1)}>
                            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                {/if}
            </div>
        {:else}
            <div class="flex min-h-[18rem] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center" role="status">
                <p class="font-bold text-[#0B1F3A]">See what our customers say on Google</p>
                <p class="mt-2 text-slate-600">Visit Google Maps for current customer feedback.</p>
                <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex min-h-11 items-center font-bold text-[#D92323] hover:underline">View Our Google Reviews</a>
            </div>
        {/if}
    </div>
</section>
