<script lang="ts">
    import { getWhatsAppUrl } from '$lib/contact';
    import { isOverlayOpen } from '$lib/overlays';

    const whatsappUrl = getWhatsAppUrl();
</script>

<!-- The widget container fixed to the bottom right -->
{#if !$isOverlayOpen}<div class="fixed bottom-6 right-6 z-(--layer-contact) hidden md:block">
    <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-whatsapp text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
        aria-label="Chat with us on WhatsApp"
    >
        <!-- The actual icon -->
        <i class="fa-brands fa-whatsapp text-3xl sm:text-4xl relative z-10"></i>
    </a>
</div>{/if}
