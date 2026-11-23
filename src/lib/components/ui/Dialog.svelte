<script lang="ts">
    import type { Snippet } from 'svelte';
    import { modal } from '$lib/overlays';

    const uid = $props.id();
    let { open, onclose, title, description, variant = 'sheet', children, id }: {
        open: boolean; onclose: () => void; title: string; description?: string;
        variant?: 'sheet' | 'drawer' | 'wide'; children: Snippet; id?: string;
    } = $props();

    function closeBackdrop(event: MouseEvent) {
        if (event.target !== event.currentTarget) return;
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onclose();
    }
</script>

{#if open}
    <!-- Native modal dialogs occupy the top layer, above every sticky control. -->
    <dialog use:modal {id} class="ui-dialog ui-dialog--{variant}" aria-labelledby={uid + '-title'} aria-describedby={description ? uid + '-description' : undefined} aria-modal="true" tabindex="-1"
        oncancel={(event) => { event.preventDefault(); onclose(); }} onclick={closeBackdrop}>
        <div class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-brand-border bg-white px-5 py-4 sm:px-6">
            <div class="min-w-0"><h2 id={uid + '-title'} class="text-xl font-bold text-brand-navy">{title}</h2>
                {#if description}<p id={uid + '-description'} class="mt-1 text-sm text-brand-muted">{description}</p>{/if}
            </div>
            <button type="button" onclick={onclose} class="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-neutral text-brand-navy hover:bg-blue-50" aria-label={'Close ' + title}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </button>
        </div>
        <div class="min-w-0 p-5 sm:p-6">{@render children()}</div>
    </dialog>
{/if}

<style>
    .ui-dialog { position: fixed; inset: 0; margin: auto; width: min(36rem, calc(100% - 2rem)); max-width: none; max-height: calc(100dvh - 2rem); padding: 0; overflow: auto; overscroll-behavior: contain; border: 1px solid var(--color-brand-border); border-radius: 1rem; background: white; color: var(--color-brand-text); box-shadow: 0 24px 80px rgb(7 20 38 / 0.25); }
    .ui-dialog::backdrop { background: rgb(7 20 38 / 0.65); backdrop-filter: blur(4px); }
    .ui-dialog--drawer { margin-right: 0; margin-block: 0; width: min(26rem, 100%); height: 100dvh; max-height: 100dvh; border-radius: 1rem 0 0 1rem; }
    .ui-dialog--wide { width: min(64rem, calc(100% - 2rem)); }
    @media (max-width: 39.999rem) {
        .ui-dialog--sheet { margin-bottom: 0; width: 100%; max-height: calc(100dvh - 1rem); border-radius: 1rem 1rem 0 0; padding-bottom: env(safe-area-inset-bottom); }
        .ui-dialog--drawer { padding-bottom: env(safe-area-inset-bottom); }
    }
</style>
