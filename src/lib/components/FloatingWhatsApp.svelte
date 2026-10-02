<script lang="ts">
    import { getWhatsAppUrl } from '$lib/contact';

    const whatsappUrl = getWhatsAppUrl();
</script>

<!-- The widget container fixed to the bottom right -->
<div class="fixed bottom-8 right-8 z-50 hidden md:block">
    <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B1F3A]"
        aria-label="Chat with us on WhatsApp"
    >
        <!-- The subtle pulsing radar effect -->
        <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
        
        <!-- The actual icon -->
        <i class="fa-brands fa-whatsapp text-3xl sm:text-4xl relative z-10"></i>
    </a>
</div>
