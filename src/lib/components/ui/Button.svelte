<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes, HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

    type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & Pick<HTMLButtonAttributes, 'type' | 'disabled' | 'form' | 'name' | 'value'> & Pick<HTMLAnchorAttributes, 'href' | 'target' | 'rel' | 'download'> & {
        children: Snippet;
        variant?: 'primary' | 'secondary' | 'whatsapp' | 'light' | 'ghost';
    };
    let { children, variant = 'primary', href, target, rel, type = 'button', class: className = '', ...rest }: Props = $props();
    const variants = {
        primary: 'border-brand-blue bg-brand-blue text-white hover:border-brand-blue-dark hover:bg-brand-blue-dark',
        secondary: 'border-brand-border bg-white text-brand-navy hover:border-brand-blue hover:bg-blue-50',
        whatsapp: 'border-brand-whatsapp bg-brand-whatsapp text-white hover:bg-[#06662d]',
        light: 'border-white/40 bg-white/10 text-white hover:bg-white/20',
        ghost: 'border-transparent text-brand-blue hover:bg-blue-50'
    };
    const classes = $derived(`inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-center text-sm font-semibold leading-snug transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`);
</script>

{#if href}
    <a {href} {target} rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)} class={classes} {...rest}>{@render children()}</a>
{:else}
    <button {type} class={classes} {...rest}>{@render children()}</button>
{/if}
