<script lang="ts">
    import { services } from '$lib/data/services';
    
    // This single variable controls the entire modal!
    let selectedService: any = $state(null); 
</script>

<section id="services" class="py-16 px-4 max-w-7xl mx-auto">
    <div class="text-center mb-12">
        <h3 class="text-3xl font-bold text-slate-900">Our Services</h3>
        <div class="w-24 h-1 bg-[#DC2626] mx-auto mt-4 rounded-full"></div>
        <p class="text-sm text-slate-500 mt-4">Click any service to see pricing and turnaround times.</p>
    </div>

    <!-- Service Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {#each Object.values(services) as service}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                onclick={() => selectedService = service} 
                class="bg-white p-8 sm:p-10 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md hover:border-[#DC2626] transition group cursor-pointer"
            >
                <i class="fa-solid {service.icon} text-5xl text-[#DC2626] mb-5 group-hover:scale-110 transition-transform"></i>
                <h4 class="text-xl font-bold text-[#1E3A8A] mb-3">{service.title}</h4>
                <p class="text-slate-500 text-sm leading-relaxed">{service.details}</p>
            </div>
        {/each}
    </div>
</section>

<!-- The Svelte Modal -->
{#if selectedService}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onclick={() => selectedService = null}
    >
        <div class="bg-white rounded-2xl w-full max-w-md mx-4 relative shadow-2xl overflow-hidden" onclick={(e) => e.stopPropagation()}>
            <button onclick={() => selectedService = null} class="absolute top-4 right-5 text-slate-400 hover:text-[#DC2626] text-3xl font-bold transition z-10">&times;</button>
            
            <div class="bg-slate-50 p-6 text-center border-b border-slate-200">
                <i class="fa-solid {selectedService.icon} text-4xl text-[#DC2626] mb-3"></i>
                <h3 class="text-2xl font-bold text-[#1E3A8A]">{selectedService.title}</h3>
            </div>
            
            <div class="p-8 space-y-4">
                <p class="text-slate-600 text-sm border-b border-slate-100 pb-4">{selectedService.details}</p>
                
                <div class="flex items-start mt-4">
                    <i class="fa-solid fa-clock text-[#DC2626] mt-1 mr-3 w-5 text-center"></i>
                    <div>
                        <h5 class="font-bold text-sm text-[#1E3A8A]">Turnaround Time</h5>
                        <p class="text-xs text-slate-600">{selectedService.turnaround}</p>
                    </div>
                </div>
                
                <div class="flex items-start">
                    <i class="fa-solid fa-indian-rupee-sign text-[#DC2626] mt-1 mr-3 w-5 text-center"></i>
                    <div>
                        <h5 class="font-bold text-sm text-[#1E3A8A]">Pricing</h5>
                        <p class="text-xs text-slate-600">{selectedService.pricing}</p>
                    </div>
                </div>
                
                <a href="https://wa.me/919944252527" target="_blank" class="block w-full text-center bg-[#25D366] text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all shadow-md mt-6 text-sm">
                    <i class="fa-brands fa-whatsapp text-lg mr-2"></i> Message to Book
                </a>
            </div>
        </div>
    </div>
{/if}