<script lang="ts">
    import { page } from '$app/state';
    let { id, compact = false }: { id: string; compact?: boolean } = $props();
</script>

<form action="/store" method="GET" role="search" aria-label="Search products" class="flex min-w-0 items-center overflow-hidden rounded-xl border border-brand-border bg-brand-neutral {compact ? 'w-full' : 'w-full lg:w-48 xl:w-60'}">
    <label for={id} class="sr-only">Search products</label>
    <input {id} type="search" name="q" value={page.url.searchParams.get('q') || ''} placeholder="Search products" class="min-h-11 min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-brand-navy focus:ring-inset focus:ring-brand-blue" />
    <button type="submit" class="inline-flex size-11 shrink-0 items-center justify-center text-brand-blue hover:bg-blue-50" aria-label="Search products">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
    </button>
</form>
