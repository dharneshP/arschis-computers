<script lang="ts">
    import { site } from '$lib/site';

    let {
        title,
        description,
        path,
        image = site.logoUrl,
        noindex = false
    }: {
        title: string;
        description: string;
        path: string;
        image?: string;
        noindex?: boolean;
    } = $props();

    const canonical = $derived(new URL(path, site.url).href);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    {#if noindex}<meta name="robots" content="noindex,follow" />{/if}

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={site.name} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content="Arschis Computers" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content="Arschis Computers" />
</svelte:head>
