<script lang="ts">
    import { onMount } from 'svelte';
    import { getGoogleReviewData } from '$lib/google-reviews';
    import { googleMapsUrl } from '$lib/location';

    let rating: number | undefined = $state();
    let ratingCount: number | undefined = $state();
    let reviewsUrl = $state(googleMapsUrl);

    onMount(async () => {
        const data = await getGoogleReviewData();
        rating = data.rating;
        ratingCount = data.userRatingsTotal;
        reviewsUrl = data.googleMapsUrl || googleMapsUrl;
    });

    const trustItems = [
        { value: '20', label: 'Years Experience', icon: 'fa-calendar-check' },
        { value: 'Erode', label: 'Based', icon: 'fa-location-dot' },
        { value: 'Sales & Service', label: 'Complete IT Solutions', icon: 'fa-screwdriver-wrench' }
    ];
</script>

<section class="bg-[#0B1F3A] px-4 py-14 text-white sm:py-16" aria-labelledby="why-heading">
    <div class="mx-auto max-w-7xl">
        <h2 id="why-heading" class="mb-9 text-center text-3xl font-extrabold sm:text-4xl">Why Arschis Computers?</h2>
        <div class="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/15 lg:grid-cols-4">
            {#each trustItems as item}
                <div class="flex min-h-36 flex-col items-center justify-center bg-[#0B1F3A] p-4 text-center">
                    <i class="fa-solid {item.icon} mb-3 text-xl text-[#F5C400]" aria-hidden="true"></i>
                    <strong class="text-xl font-extrabold sm:text-2xl">{item.value}</strong>
                    <span class="mt-1 text-sm text-slate-300">{item.label}</span>
                </div>
            {/each}
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" class="flex min-h-36 flex-col items-center justify-center bg-[#0B1F3A] p-4 text-center transition-colors hover:bg-[#071426]" aria-label="View Arschis Computers reviews on Google Maps">
                <i class="fa-solid fa-star mb-3 text-xl text-[#F5C400]" aria-hidden="true"></i>
                {#if rating}
                    <strong class="text-xl font-extrabold sm:text-2xl">{rating.toFixed(1)} / 5</strong>
                    <span class="mt-1 text-sm text-slate-300">Google Rating{ratingCount ? ` · ${ratingCount} reviews` : ''}</span>
                {:else}
                    <strong class="text-base font-extrabold sm:text-lg">View Our Google Reviews</strong>
                    <span class="mt-1 text-sm text-slate-300">Google Maps</span>
                {/if}
            </a>
        </div>
    </div>
</section>
