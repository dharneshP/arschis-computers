<script lang="ts">
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    import { isOverlayOpen } from '$lib/store';

    const whatsappUrl = getWhatsAppUrl();
</script>

{#if !$isOverlayOpen}<nav aria-label="Quick contact" class="fixed inset-x-0 bottom-0 z-[60] flex min-h-14 w-full bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(7,20,38,0.18)] md:hidden">
    <a href={phoneUrl} aria-label="Call Arschis Computers" class="flex min-h-14 flex-1 items-center justify-center gap-2 border-r border-white/15 bg-[#0B1F3A] px-3 text-center font-bold text-white transition-colors active:bg-[#071426] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white">
        <i class="fa-solid fa-phone" aria-hidden="true"></i> Call
    </a>
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Message Arschis Computers on WhatsApp" class="flex min-h-14 flex-1 items-center justify-center gap-2 bg-[#087A35] px-3 text-center font-bold text-white transition-colors active:bg-[#06662D] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white">
        <i class="fa-brands fa-whatsapp text-xl" aria-hidden="true"></i> WhatsApp
    </a>
</nav>{/if}
