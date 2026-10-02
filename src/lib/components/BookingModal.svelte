<script lang="ts">
    import { isBookingOpen } from '$lib/store';
    import { getWhatsAppUrl } from '$lib/contact';
    import { tick } from 'svelte';
    
    // Form states
    let name = $state('');
    let phone = $state('');
    let device = $state('Laptop');
    let issue = $state('');
    let nameInput: HTMLInputElement;
    let dialogElement: HTMLElement;
    let previousFocus: HTMLElement | null = null;
    let wasOpen = false;

    $effect(() => {
        const isOpen = $isBookingOpen;

        if (isOpen && !wasOpen) {
            previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            void tick().then(() => nameInput?.focus());
        } else if (!isOpen && wasOpen) {
            previousFocus?.focus();
        }

        wasOpen = isOpen;
    });

    function closeModal() {
        $isBookingOpen = false;
    }

    function keepFocusInDialog(event: KeyboardEvent) {
        if (event.key !== 'Tab') return;

        const focusable = Array.from(
            dialogElement.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href]')
        ).filter((element) => !element.hasAttribute('disabled'));
        const first = focusable[0];
        const last = focusable.at(-1);

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    }

    function submitBooking(e: Event) {
        e.preventDefault();
        
        const text = `*New Service Booking!*

*Name:* ${name}
*Phone:* ${phone}
*Device:* ${device}
*Issue:* ${issue}

_Sent from arschiscomputers.in_`;

        window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
        
        // Close modal and reset form
        closeModal();
        name = '';
        phone = '';
        issue = '';
    }
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && $isBookingOpen && closeModal()} />

{#if $isBookingOpen}
<!-- Background Overlay -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm" onclick={closeModal}>
    
    <!-- Modal Card -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- Added tabindex="-1" here to fix the accessibility warning -->
    <div bind:this={dialogElement} class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200" onclick={(e) => e.stopPropagation()} onkeydown={keepFocusInDialog} role="dialog" aria-modal="true" aria-labelledby="booking-heading" aria-describedby="booking-description">
        
        <!-- Header -->
        <div class="bg-[#1E3A8A] p-5 text-white flex justify-between items-center">
            <h2 id="booking-heading" class="text-xl font-bold flex items-center"><i class="fa-solid fa-wrench mr-2" aria-hidden="true"></i> Book a Service</h2>
            <!-- This is the actual accessible button that satisfies screen readers -->
            <button type="button" onclick={closeModal} class="flex min-h-11 min-w-11 items-center justify-center text-white/80 transition-colors hover:text-white" aria-label="Close booking form">
                <i class="fa-solid fa-xmark text-2xl" aria-hidden="true"></i>
            </button>
        </div>
        
        <!-- Form -->
        <form onsubmit={submitBooking} class="p-6 space-y-4">
            <p id="booking-description" class="text-sm text-slate-600">Enter your service details, then continue securely in WhatsApp.</p>
            <div>
                <label for="name" class="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
                <input bind:this={nameInput} type="text" id="name" bind:value={name} autocomplete="name" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] outline-none transition-all" placeholder="Enter your name">
            </div>
            
            <div>
                <label for="phone" class="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" bind:value={phone} autocomplete="tel" inputmode="tel" required class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] outline-none transition-all" placeholder="Enter your mobile number">
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
            
            <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg bg-[#087A35] py-3 font-bold text-white shadow-md transition-colors hover:bg-[#06662D]">
                <i class="fa-brands fa-whatsapp text-xl mr-2"></i> Book via WhatsApp
            </button>
        </form>
    </div>
</div>
{/if}
