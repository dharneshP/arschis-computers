<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    let { children, class: className = '', ...rest }: HTMLAttributes<HTMLElement> & { children: Snippet } = $props();
</script>

<article class="min-w-0 overflow-hidden rounded-card border border-brand-border bg-white shadow-card {className}" {...rest}>
    {@render children()}
</article>
