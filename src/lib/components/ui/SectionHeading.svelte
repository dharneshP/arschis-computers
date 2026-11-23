<script lang="ts">
    let { title, description, eyebrow, id, level = 2, align = 'left' }: {
        title: string; description?: string; eyebrow?: string; id?: string; level?: 1 | 2; align?: 'left' | 'center';
    } = $props();
</script>

<div class:mx-auto={align === 'center'} class:text-center={align === 'center'} class="max-w-3xl">
    {#if eyebrow}<p class="mb-3 text-sm font-semibold tracking-widest text-brand-blue uppercase">{eyebrow}</p>{/if}
    <svelte:element this={level === 1 ? 'h1' : 'h2'} {id} class="text-heading font-bold tracking-tight text-brand-navy">{title}</svelte:element>
    {#if description}<p class="mt-4 text-base leading-relaxed text-brand-muted sm:text-lg">{description}</p>{/if}
</div>
