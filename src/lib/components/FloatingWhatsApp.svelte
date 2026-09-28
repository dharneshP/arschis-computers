<script lang="ts">
    // This directly opens the WhatsApp app or web interface with a pre-filled message!
    const whatsappNumber = "919944252527"; 
    const message = "Hi Arschis Computers, I need help with my device. Can I book a service?";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
</script>

<!-- The widget container fixed to the bottom right -->
<div class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
    <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        class="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 group"
        aria-label="Chat with us on WhatsApp"
    >
        <!-- The subtle pulsing radar effect -->
        <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
        
        <!-- The actual icon -->
        <i class="fa-brands fa-whatsapp text-3xl sm:text-4xl relative z-10"></i>
    </a>
</div>