<script lang="ts">
    import type { ProductLoadResult } from '$lib/products';
    import ProductCard from '$lib/components/ProductCard.svelte';
    import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import Card from '$lib/components/ui/Card.svelte';
    import ContactActions from '$lib/components/ContactActions.svelte';
    let { productData }: { productData: ProductLoadResult } = $props();
</script>

<section id="featured-products" class="bg-brand-neutral py-section" aria-labelledby="products-heading">
    <div class="site-container">
        <div class="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading id="products-heading" eyebrow="Explore the catalogue" title="Featured Products" description="A selection from our latest listings. Ask our team for current pricing and availability." />
            <Button href="/store" variant="secondary" class="shrink-0">View All Products</Button>
        </div>
        {#if productData.status === 'success'}
            <div class="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {#each productData.products as product (product._id)}<ProductCard {product} headingLevel={3} sizes="(min-width: 1280px) 290px, (min-width: 1024px) 25vw, 50vw" />{/each}
            </div>
        {:else}
            <Card class="p-8 text-center" role="status">
                <h3 class="text-xl font-bold text-brand-navy">{productData.status === 'empty' ? 'Product information is currently being updated.' : 'Products are temporarily unavailable online.'}</h3>
                <p class="mt-3 text-brand-muted">Contact us for current products and availability.</p>
                <ContactActions class="mt-5 justify-center" message="Hi Arschis Computers, please share your current product availability." />
            </Card>
        {/if}
    </div>
</section>
