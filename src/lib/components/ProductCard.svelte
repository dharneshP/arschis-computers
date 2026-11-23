<script lang="ts">
    import { formatProductSpecs, getOptimizedProductImage, getProductImageSrcset, getProductQuoteUrl, type Product } from '$lib/products';
    import Card from '$lib/components/ui/Card.svelte';
    import Button from '$lib/components/ui/Button.svelte';
    import ConditionBadge from '$lib/components/ConditionBadge.svelte';

    let { product, headingLevel = 2, sizes = '(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 50vw' }: { product: Product; headingLevel?: 2 | 3; sizes?: string } = $props();
    let imageFailed = $state(false);
    const specs = $derived(formatProductSpecs(product.specs));
</script>

<Card class="flex h-full flex-col" data-product-id={product._id}>
    <div class="flex aspect-[4/3] items-center justify-center border-b border-brand-border bg-white p-3 sm:p-5">
        <img src={imageFailed ? '/logo-header.png' : getOptimizedProductImage(product.image, 640)} srcset={imageFailed ? undefined : getProductImageSrcset(product.image)} {sizes} alt={product.name || 'Arschis Computers product'} width="640" height="480" loading="lazy" decoding="async" class="h-full w-full object-contain" onerror={() => imageFailed = true} />
    </div>
    <div class="flex flex-1 flex-col gap-3 p-3 sm:p-5">
        <p class="text-xs font-semibold tracking-wide wrap-anywhere text-brand-muted uppercase">{product.category?.trim() || 'Computer product'}</p>
        <svelte:element this={headingLevel === 3 ? 'h3' : 'h2'} class="text-base font-bold leading-snug wrap-anywhere text-brand-navy sm:text-lg">{product.name || 'Product enquiry'}</svelte:element>
        <div><ConditionBadge condition={product.condition} /></div>
        {#if specs.length}
            <ul class="mb-2 flex-1 space-y-2 text-sm text-brand-muted">{#each specs as spec}<li class="flex items-start gap-2"><span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-blue" aria-hidden="true"></span><span class="min-w-0 wrap-anywhere">{spec}</span></li>{/each}</ul>
        {:else}<p class="mb-2 flex-1 text-sm text-brand-muted">Specifications available on enquiry.</p>{/if}
        <Button href={getProductQuoteUrl(product.name)} target="_blank" variant="whatsapp" aria-label={'Get a quote for ' + (product.name || 'this product') + ' on WhatsApp'} class="mt-auto w-full px-2 sm:px-4">Get a Quote</Button>
    </div>
</Card>
