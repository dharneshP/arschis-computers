<script lang="ts">
    import { afterNavigate, goto } from '$app/navigation';
    import { page } from '$app/state';
    import { onMount, tick } from 'svelte';
    import { isBookingOpen } from '$lib/store';
    import { site } from '$lib/site';
    import Button from '$lib/components/ui/Button.svelte';
    import Dialog from '$lib/components/ui/Dialog.svelte';
    import ContactActions from '$lib/components/ContactActions.svelte';
    import ProductSearch from '$lib/components/ProductSearch.svelte';

    let menuOpen = $state(false);
    const links = [
        { label: 'Home', href: '/' }, { label: 'Shop', href: '/store' },
        { label: 'Services', href: '/#services' }, { label: 'About', href: '/#about' },
        { label: 'Contact', href: '/#contact' }
    ];
    function isCurrent(href: string) {
        return href.includes('#') ? page.url.pathname === '/' && page.url.hash === href.slice(1)
            : href === '/' ? page.url.pathname === '/' && !page.url.hash : page.url.pathname.startsWith(href);
    }
    afterNavigate(() => { menuOpen = false; });
    onMount(() => {
        const desktop = window.matchMedia('(min-width: 64rem)');
        const closeOnDesktop = () => { if (desktop.matches) menuOpen = false; };
        desktop.addEventListener('change', closeOnDesktop);
        return () => desktop.removeEventListener('change', closeOnDesktop);
    });
    async function bookFromMenu() {
        menuOpen = false;
        await tick();
        $isBookingOpen = true;
    }
    async function navigateFromMenu(event: MouseEvent, href: string) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        menuOpen = false;
        // Unlock scrolling before SvelteKit applies the destination/hash scroll.
        await tick();
        await goto(href);
        const hash = new URL(href, window.location.href).hash;
        if (hash) {
            const destination = document.getElementById(hash.slice(1));
            if (destination) {
                destination.scrollIntoView({ behavior: 'instant', block: 'start' });
                destination.setAttribute('tabindex', '-1');
                destination.focus({ preventScroll: true });
            }
        }
    }
</script>

<header class="sticky top-0 z-(--layer-header) border-b border-brand-border bg-white/95 backdrop-blur-md">
    <div class="site-container flex h-18 items-center justify-between gap-2 lg:h-20">
        <a href="/" aria-label={site.name + ' Home'} class="shrink-0 rounded-lg">
            <img src="/logo-header.png" alt={site.name} width="360" height="120" decoding="async" class="h-auto w-28 min-[360px]:w-32 sm:w-44 lg:w-48" />
        </a>
        <nav aria-label="Primary navigation" class="hidden items-center gap-1 lg:flex">
            {#each links as link}
                <a href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined} class="rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors {isCurrent(link.href) ? 'bg-blue-50 text-brand-blue' : 'text-brand-muted hover:bg-brand-neutral hover:text-brand-blue'}">{link.label}</a>
            {/each}
        </nav>
        <div class="hidden lg:block"><ProductSearch id="header-search" /></div>
        <div class="flex shrink-0 items-center gap-2">
            <Button onclick={() => $isBookingOpen = true} aria-haspopup="dialog" class="px-3 sm:px-4">Book Service</Button>
            <button type="button" onclick={() => menuOpen = true} class="inline-flex size-11 items-center justify-center rounded-xl border border-brand-border text-brand-navy lg:hidden" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-haspopup="dialog">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
    </div>
    <div class="border-t border-brand-border/60 py-2 lg:hidden"><div class="site-container"><ProductSearch id="mobile-header-search" compact /></div></div>
</header>

<Dialog open={menuOpen} onclose={() => menuOpen = false} title="Menu" variant="drawer" id="mobile-navigation">
    <nav aria-label="Mobile navigation" class="flex flex-col gap-2">
        {#each links as link}
            <a href={link.href} onclick={(event) => navigateFromMenu(event, link.href)} aria-current={isCurrent(link.href) ? 'page' : undefined} class="rounded-xl px-4 py-3 text-base font-semibold {isCurrent(link.href) ? 'bg-blue-50 text-brand-blue' : 'text-brand-navy hover:bg-brand-neutral'}">{link.label}</a>
        {/each}
    </nav>
    <a href="/gallery" onclick={(event) => navigateFromMenu(event, '/gallery')} class="mt-3 inline-flex min-h-11 items-center px-4 text-sm font-semibold text-brand-blue">Our Work Gallery</a>
    <div class="mt-6 space-y-4 border-t border-brand-border pt-6">
        <Button onclick={bookFromMenu} class="w-full">Book a Service</Button>
        <ContactActions />
    </div>
</Dialog>
