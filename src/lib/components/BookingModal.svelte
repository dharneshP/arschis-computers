<script lang="ts">
    import { isBookingOpen } from '$lib/store';
    
    // Form states
    let name = $state('');
    let phone = $state('');
    let device = $state('Laptop');
    let issue = $state('');

    function submitBooking(e: Event) {
        e.preventDefault();
        
        // Format the message cleanly for WhatsApp
        const text = `*New Service Booking!*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Device:* ${device}%0A*Issue:* ${issue}%0A%0A_Sent from arschiscomputers.in_`;
        
        // Open WhatsApp with the pre-filled text to your number
        window.open(`https://wa.me/919944252527?text=${text}`, '_blank');
        
        // Close modal and reset form
        $isBookingOpen = false;
        name = '';
        phone = '';
        issue = '';
    }
</script>

{#if $isBookingOpen}
<!-- Background Overlay -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onclick={() => $isBookingOpen = false}>
    
    <!-- Modal Card -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        
        <!-- Header -->
        <div class="bg-[#1E3A8A] p-5 text-white flex justify-between items-center">
            <h3 class="text-xl font-bold flex items-center"><i class="fa-solid fa-wrench mr-2"></i> Book a Service</h3>
            <!-- This is the actual accessible button that satisfies screen readers -->
            <button onclick={() => $isBookingOpen = false} class="text-white/80 hover:text-white transition-colors" aria-label="Close form">
                <i class="fa-solid fa-xmark text-2xl"></i>
            </button>
        </div>
        
        <!-- Form -->
        <form onsubmit={submitBooking} class="p-6 space-y-4">
            <div>
                <label for="name" class="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
                <input type="text" id="name" bind:value={name} required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] outline-none transition-all" placeholder="Enter your name">
            </div>
            
            <div>
                <label for="phone" class="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" bind:value={phone} required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] outline-none transition-all" placeholder="Enter your mobile number">
            </div>
            
            <div>
                <label for="device" class="block text-sm font-bold text-slate-700 mb-1">Device Type</label>
                <select id="device" bind:value={device} class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] outline-none transition-all bg-white">
                    <option value="Laptop">Laptop</option>
                    <option value="Desktop PC">Desktop PC</option>
                    <option value="Printer">Printer</option>
                    <option value="CCTV/Networking">CCTV / Networking</option>
                    <option value="Accessories/Other">Accessories / Other</option>
                </select>
            </div>
            
            <div>
                <label for="issue" class="block text-sm font-bold text-slate-700 mb-1">Describe the Issue</label>
                <textarea id="issue" bind:value={issue} required rows="3" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] outline-none transition-all resize-none" placeholder="E.g., Screen is broken, PC won't turn on..."></textarea>
            </div>
            
            <button type="submit" class="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-3 rounded-lg mt-4 transition-colors shadow-md flex items-center justify-center">
                <i class="fa-brands fa-whatsapp text-xl mr-2"></i> Book via WhatsApp
            </button>
        </form>
    </div>
</div>
{/if}