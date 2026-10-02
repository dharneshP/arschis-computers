<script lang="ts">
    import { onMount } from 'svelte';
    import { getGoogleReviewData, type GoogleReview } from '$lib/google-reviews';
    import { googleMapsUrl } from '$lib/location';

    let reviews: GoogleReview[] = $state([]);
    let reviewsUrl = $state(googleMapsUrl);
    let loading = $state(true);

    onMount(async () => {
        const data = await getGoogleReviewData();
        reviews = data.reviews.filter((review) => review.rating >= 4 && review.text).slice(0, 3);
        reviewsUrl = data.googleMapsUrl || googleMapsUrl;
        loading = false;
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

        {#if loading}
            <p class="py-10 text-center text-slate-600" aria-live="polite">Loading Google reviews…</p>
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
            <div class="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p class="text-slate-600">Customer reviews are available on Google Maps.</p>
                <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex min-h-11 items-center font-bold text-[#D92323] hover:underline">View Our Google Reviews</a>
            </div>
        {/if}
    </div>
</section>
