<script lang="ts">
    import { onMount } from 'svelte';
    import { featuredProductsQuery, getOptimizedProductImage, getProductQuoteUrl, productClient, type Product } from '$lib/products';

    let products: Product[] = $state([]);
    let loading = $state(true);

    onMount(async () => {
        try {
            products = await productClient.fetch<Product[]>(featuredProductsQuery);
        } catch {
            products = [];
        } finally {
            loading = false;
        }
    });
</script>

<section class="bg-[#F5F7FA] px-4 py-14 sm:py-20" aria-labelledby="products-heading">
    <div class="mx-auto max-w-7xl">
        <div class="mb-9 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
                <h2 id="products-heading" class="text-3xl font-extrabold text-[#0B1F3A] sm:text-4xl">Products</h2>
                <p class="mt-2 text-slate-600">A preview of our latest computer products and components.</p>
            </div>
            <a href="/store" class="inline-flex min-h-11 items-center justify-center font-bold text-[#D92323] hover:underline">View All Products <span aria-hidden="true" class="ml-2">→</span></a>
        </div>

        {#if loading}
            <p class="min-h-[18rem] py-12 text-center text-slate-600" aria-live="polite">Loading products…</p>
        {:else if products.length}
            <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {#each products as product (product._id)}
                    <article class="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div class="aspect-[4/3] bg-white p-3">
                            <img
                                src={getOptimizedProductImage(product.image, 480)}
                                srcset={product.image ? `${getOptimizedProductImage(product.image, 320)} 320w, ${getOptimizedProductImage(product.image, 480)} 480w` : undefined}
                                sizes="(min-width: 1024px) 25vw, 50vw"
                                alt={product.name || 'Arschis Computers product'}
                                width="480"
                                height="360"
                                loading="lazy"
                                decoding="async"
                                class="h-full w-full object-contain"
                            />
                        </div>
                        <div class="flex flex-1 flex-col border-t border-slate-100 p-3 sm:p-4">
                            <span class="text-[0.65rem] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">{product.category || 'Computer product'}</span>
                            <h3 class="mt-1 flex-1 text-sm font-bold leading-snug text-[#0B1F3A] sm:text-lg">{product.name || 'Product enquiry'}</h3>
                            <a href={getProductQuoteUrl(product.name)} target="_blank" rel="noopener noreferrer" class="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#D92323] px-2 py-2 text-xs font-bold text-white hover:bg-red-700 sm:text-sm">Get a Quote</a>
                        </div>
                    </article>
                {/each}
            </div>
        {:else}
            <div class="rounded-xl border border-slate-200 bg-white p-8 text-center">
                <p class="text-slate-600">Current product availability is listed on our Products page.</p>
                <a href="/store" class="mt-4 inline-flex min-h-11 items-center font-bold text-[#D92323] hover:underline">View All Products</a>
            </div>
        {/if}
    </div>
</section>
