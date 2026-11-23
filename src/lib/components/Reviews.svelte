<script lang="ts">
    import { onMount } from 'svelte';
    import { getGoogleReviewData, type GoogleReviewResult } from '$lib/google-reviews';
    import { googleMapsUrl } from '$lib/location';
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    import Button from '$lib/components/ui/Button.svelte';

    let placeData = $state<GoogleReviewResult | null>(null);
    let status = $state<'loading' | 'success' | 'empty' | 'error'>('loading');
    let fetching = $state(false);
    let section: HTMLElement;
    let scroller = $state<HTMLDivElement>();
    let disposed = false;
    const rating = $derived(typeof placeData?.rating === 'number' && Number.isFinite(placeData.rating) ? placeData.rating : null);
    const reviewsUrl = $derived(placeData?.googleMapsUrl || googleMapsUrl);

    async function loadReviews() {
        if (fetching) return;
        fetching = true;
        status = 'loading';
        const result = await getGoogleReviewData();
        if (disposed) return;
        placeData = result;
        status = result.status;
        fetching = false;
    }
    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); void loadReviews(); }
        }, { rootMargin: '500px 0px' });
        observer.observe(section);
        return () => { disposed = true; observer.disconnect(); };
    });
    function move(direction: number) {
        scroller?.scrollBy({ left: direction * scroller.clientWidth, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
</script>

<section bind:this={section} id="google-reviews" class="min-w-0 bg-brand-neutral py-section" aria-labelledby="reviews-heading">
    <div class="site-container">
        <div class="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading id="reviews-heading" eyebrow="From our customers" title="What Our Customers Say" description="Real experiences shared on Google." />
            <div class="flex min-h-14 flex-wrap items-center gap-3 text-brand-navy">
                {#if rating !== null}<strong class="text-3xl font-bold">{rating.toFixed(1)}<span class="text-base font-normal text-brand-muted"> / 5</span></strong><div><div class="text-amber-600" aria-hidden="true">{#each Array(5) as _, index}<i class="fa-{index < Math.round(rating) ? 'solid' : 'regular'} fa-star"></i>{/each}</div><p class="mt-1 text-sm text-brand-muted">{placeData?.userRatingsTotal ?? ''} Google reviews</p></div>{:else}<p class="text-sm text-brand-muted">Google customer reviews</p>{/if}
            </div>
        </div>
        <div class="min-h-[310px]" aria-busy={status === 'loading'}>
            {#if status === 'loading'}
                <div role="status"><span class="sr-only">Loading Google reviews</span><div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">{#each Array(3) as _, index}<div class="h-64 rounded-card border border-brand-border bg-white p-6 {index > 0 ? 'hidden sm:block' : ''}"><div class="mb-6 h-10 w-10 rounded-full bg-slate-100 motion-safe:animate-pulse"></div><div class="mb-3 h-4 w-3/4 rounded bg-slate-100"></div><div class="mb-3 h-4 rounded bg-slate-100"></div><div class="h-4 w-2/3 rounded bg-slate-100"></div></div>{/each}</div></div>
            {:else if placeData?.reviews.length}
                <div bind:this={scroller} class="review-track flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4" role="region" aria-label="Customer reviews">
                    {#each placeData.reviews as review}
                        <article class="min-w-0 shrink-0 basis-full snap-start rounded-card border border-brand-border bg-white p-6 sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-0.84rem)]">
                            <div class="mb-5 flex items-center gap-3">
                                {#if review.profile_photo_url}<img src={review.profile_photo_url} alt="" width="40" height="40" loading="lazy" decoding="async" referrerpolicy="no-referrer" class="size-10 shrink-0 rounded-full object-cover" />{:else}<span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-brand-blue" aria-hidden="true">{review.author_name.slice(0,1)}</span>{/if}
                                <div class="min-w-0"><h3 class="break-words text-sm font-semibold text-brand-navy">{#if review.author_uri}<a href={review.author_uri} target="_blank" rel="noopener noreferrer" class="hover:underline">{review.author_name}</a>{:else}{review.author_name}{/if}</h3><p class="text-xs text-brand-muted">{review.relativePublishTimeDescription || 'Google review'}</p></div>
                                <span class="ml-auto text-sm font-semibold text-brand-muted" aria-label="Google">G</span>
                            </div>
                            <p class="mb-4 text-amber-600" aria-label={review.rating + ' out of 5 stars'}>{#each Array(5) as _, star}<i class="fa-{star < Math.round(review.rating) ? 'solid' : 'regular'} fa-star" aria-hidden="true"></i>{/each}</p>
                            {#if review.text}<p class="line-clamp-5 break-words text-sm leading-relaxed text-brand-muted">{review.text}</p>{:else}<p class="text-sm text-brand-muted">This customer left a rating on Google.</p>{/if}
                        </article>
                    {/each}
                </div>
            {:else}
                <div class="rounded-card border border-brand-border bg-white p-8 text-center" role="status"><p class="text-lg font-semibold text-brand-navy">{status === 'error' ? 'Google reviews are temporarily unavailable.' : 'No review comments are available right now.'}</p><p class="mt-3 text-sm text-brand-muted">You can still visit our Google listing to read customer reviews.</p>{#if status === 'error'}<Button onclick={loadReviews} variant="secondary" class="mt-5">Try Again</Button>{/if}</div>
            {/if}
        </div>
        <div class="mt-5 flex flex-wrap items-center justify-between gap-4">
            <Button href={reviewsUrl} target="_blank" variant="secondary">View all reviews on Google</Button>
            {#if status === 'success' && (placeData?.reviews.length || 0) > 1}<div class="flex gap-2"><Button onclick={() => move(-1)} variant="secondary" aria-label="Previous Review">Previous</Button><Button onclick={() => move(1)} variant="secondary" aria-label="Next Review">Next</Button></div>{/if}
        </div>
    </div>
</section>

<style>.review-track { scrollbar-width: thin; scrollbar-color: #94a3b8 transparent; }</style>
