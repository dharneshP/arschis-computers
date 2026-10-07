<script lang="ts">
    import { isBookingOpen, overlayCount } from '$lib/store';
    import { fade, fly } from 'svelte/transition';

    // Form State (using Svelte 5 runes)
    let name = $state('');
    let mobile = $state('');
    // Changed to an array to hold multiple selections
    let selectedServices = $state<string[]>([]);
    let problem = $state('');
    let preferredType = $state('Visit Arschis Store');
    $effect(() => {
        overlayCount.set($isBookingOpen ? 1 : 0);
        if (typeof document !== 'undefined') document.body.style.overflow = $isBookingOpen ? 'hidden' : '';
    });

    const serviceCategories = [
        { label: 'PC / Laptop', icon: 'fa-solid fa-desktop' },
        { label: 'Printer', icon: 'fa-solid fa-print' },
        { label: 'Network', icon: 'fa-solid fa-network-wired' },
        { label: 'Other', icon: 'fa-solid fa-screwdriver-wrench' }
    ];

    // Function to add/remove services from the array
    function toggleService(label: string) {
        if (selectedServices.includes(label)) {
            // Remove it if it's already selected
            selectedServices = selectedServices.filter(s => s !== label);
        } else {
            // Add it if it's not selected
            selectedServices = [...selectedServices, label];
        }
    }

    function handleWhatsAppSubmit(e: Event) {
        e.preventDefault();

        // Check if the array is empty
        if (selectedServices.length === 0) {
            alert('Please select at least one service category.');
            return;
        }

        // Construct the structured WhatsApp message
        // .join(', ') turns the array into a neat string like: "PC / Laptop, Printer"
        const message = `Hi Arschis Computers,

I would like to book a service.

*Name:* ${name}
*Mobile:* ${mobile}
*Services:* ${selectedServices.join(', ')}
*Problem:* ${problem}
*Preferred Service:* ${preferredType}`;

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/919944252527?text=${encodedMessage}`, '_blank');
        
        // Close modal after submission
        $isBookingOpen = false;
        
        // Optional: Reset form
        name = ''; mobile = ''; selectedServices = []; problem = ''; preferredType = 'Visit Arschis Store';
    }
</script>

{#if $isBookingOpen}
    <!-- Backdrop: items-end for mobile bottom-sheet, sm:items-center for desktop modal -->
    <div 
        class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        transition:fade={{ duration: 200 }}
    >
        <!-- Click away to close -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onclick={() => $isBookingOpen = false}></div>

        <!-- Modal Content Container -->
        <div 
            class="relative bg-white w-full sm:max-w-xl rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[100dvh] sm:max-h-[90vh]"
            transition:fly={{ y: 100, duration: 300 }}
        >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div>
                    <h2 class="text-xl font-extrabold text-slate-900">Book a Service</h2>
                    <p class="text-sm text-slate-500 mt-1">Tell us what you need. We'll continue on WhatsApp.</p>
                </div>
                <button 
                    onclick={() => $isBookingOpen = false}
                    class="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <!-- Scrollable Form Body -->
            <div class="overflow-y-auto px-6 py-6 custom-scrollbar">
                <form id="booking-form" onsubmit={handleWhatsAppSubmit} class="space-y-6">
                    
                    <!-- Name & Mobile (Side by side on desktop) -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <label for="name" class="block text-sm font-bold text-slate-700 mb-1">Your Name *</label>
                            <input type="text" id="name" bind:value={name} required placeholder="Name" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all" />
                        </div>
                        <div>
                            <label for="mobile" class="block text-sm font-bold text-slate-700 mb-1">Mobile Number *</label>
                            <input type="tel" id="mobile" bind:value={mobile} required placeholder="+91" pattern="[0-9+ ]+" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all" />
                        </div>
                    </div>

                    <!-- Service Category Chips (Multi-select) -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-2">
                            What needs service? * <span class="text-xs text-slate-400 font-normal ml-1">(Select multiple if needed)</span>
                        </label>
                        <div class="flex flex-wrap gap-2">
                            {#each serviceCategories as service}
                                <button 
                                    type="button"
                                    onclick={() => toggleService(service.label)}
                                    class="px-4 py-2 rounded-lg text-sm font-bold border transition-all flex items-center gap-2 {selectedServices.includes(service.label) ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}"
                                >
                                    <!-- FontAwesome Icon dynamically switches color based on selection -->
                                    <i class="{service.icon} text-sm {selectedServices.includes(service.label) ? 'text-white' : 'text-slate-400'}"></i>
                                    {service.label}
                                </button>
                            {/each}
                        </div>
                    </div>

                    <!-- Problem Description -->
                    <div>
                        <label for="problem" class="block text-sm font-bold text-slate-700 mb-1">Describe the problem *</label>
                        <textarea id="problem" bind:value={problem} required rows="3" placeholder="Example: Dell laptop is not switching on..." class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#DC2626] focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"></textarea>
                    </div>

                    <!-- Preferred Service -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-2">Preferred Service</label>
                        <div class="flex gap-6">
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="service_type" value="Visit Arschis Store" bind:group={preferredType} class="w-5 h-5 text-[#DC2626] focus:ring-[#DC2626] border-slate-300" />
                                <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">Visit Arschis Store</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer group">
                                <input type="radio" name="service_type" value="On-site Service" bind:group={preferredType} class="w-5 h-5 text-[#DC2626] focus:ring-[#DC2626] border-slate-300" />
                                <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900">On-site Service</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Footer / CTA -->
            <div class="p-6 border-t border-slate-100 bg-slate-50 sm:rounded-b-2xl pb-8 sm:pb-6">
                <!-- Submit connects to form using the form="booking-form" attribute -->
                <button type="submit" form="booking-form" class="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white text-lg font-bold py-3.5 px-4 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 mb-4">
                    <i class="fa-brands fa-whatsapp text-xl"></i> Continue on WhatsApp
                </button>
                
                <div class="text-center text-sm font-medium text-slate-500">
                    Or call us directly: 
                    <a href="tel:+919944252527" class="text-slate-800 font-bold hover:text-[#DC2626] ml-1 inline-flex items-center gap-1 transition-colors">
                        <i class="fa-solid fa-phone text-xs"></i> Call Now
                    </a>
                </div>
            </div>

        </div>
    </div>
    
    <style>
        /* Small style block to make the textarea scrollbar slim and neat */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #cbd5e1;
            border-radius: 20px;
        }
    </style>
{/if}
