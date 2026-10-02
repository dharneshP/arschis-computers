<script lang="ts">
    import { onMount } from 'svelte';
    import { getGoogleReviewData, type GoogleReview, type GoogleReviewLoadStatus } from '$lib/google-reviews';
    import { googleMapsUrl } from '$lib/location';

    let reviews: GoogleReview[] = $state([]);
    let reviewsUrl = $state(googleMapsUrl);
    let status: GoogleReviewLoadStatus | 'loading' = $state('loading');

    onMount(async () => {
        const data = await getGoogleReviewData();
        reviews = data.reviews.filter((review) => review.rating >= 4 && review.text).slice(0, 3);
        reviewsUrl = data.googleMapsUrl || googleMapsUrl;
        status = reviews.length ? 'success' : data.status === 'error' ? 'error' : 'empty';
    });

    function formatDate(unixTime: number) {
        return new Date(unixTime * 1000).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
            <div class="grid gap-5 md:grid-cols-3">
                {#each reviews as review}
                    <article class="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div class="mb-3 text-[#F5C400]" aria-label={`${review.rating} out of 5 stars`}>
                            {#each Array(review.rating) as _}
                                <i class="fa-solid fa-star" aria-hidden="true"></i>
                            {/each}
                        </div>
                        <p class="line-clamp-5 flex-1 text-sm leading-relaxed text-slate-600">“{review.text}”</p>
                        <div class="mt-5 border-t border-slate-100 pt-4">
                            <strong class="block text-sm text-[#0B1F3A]">{review.author_name}</strong>
                            <span class="text-xs text-slate-500">{formatDate(review.time)} · Google review</span>
                        </div>
                    </article>
                {/each}
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
