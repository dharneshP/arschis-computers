<script lang="ts">
    import { getConditionLabel, normalizeProductValue } from '$lib/products';
    let { condition }: { condition?: string } = $props();
    const styles: Record<string, string> = {
        new: 'border-blue-200 bg-blue-50 text-blue-800',
        used: 'border-slate-300 bg-slate-100 text-slate-800',
        refurbished: 'border-teal-200 bg-teal-50 text-teal-900'
    };
</script>

<span class="inline-flex max-w-full items-center rounded-full border px-2.5 py-1 text-xs font-semibold leading-snug {styles[normalizeProductValue(condition)] || 'border-brand-border bg-brand-neutral text-brand-muted'}">
    <span class="sr-only">Condition: </span>{getConditionLabel(condition)}
</span>
