<script lang="ts">
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    import { site } from '$lib/site';
</script>

<footer id="contact" class="scroll-mt-20 bg-slate-900 text-slate-300 py-12 px-4">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="text-center md:text-left">
            <h3 class="text-2xl font-bold text-white mb-6">Arschis Computers</h3>
            <p class="mb-4 flex items-start justify-center md:justify-start">
                <i class="fa-solid fa-location-dot text-red-500 mt-1 mr-3 shrink-0"></i> 
                <span class="text-left">{site.address.streetAddress}<br>{site.address.addressLocality} - {site.address.postalCode}, {site.address.addressRegion}</span>
            </p>
            <p class="mb-4 flex items-center justify-center md:justify-start">
                <i class="fa-solid fa-clock text-red-500 mr-3 shrink-0"></i> Open Daily: 10:00 AM - 9:00 PM
            </p>

            <!-- Email Information Added Here -->
            <p class="mb-4 flex items-center justify-center md:justify-start">
                <i class="fa-solid fa-envelope text-red-500 mr-3 shrink-0"></i>
                <a href={`mailto:${site.email}`} class="hover:text-white transition-colors">
                    {site.email}
                </a>
            </p>

            <p class="text-sm text-slate-400 mt-8 font-bold">Prop: A.P. Vasanthakumar B.Sc., DECE. | 20 Years Experience</p>
        </div>
        
        <div class="bg-slate-800 p-8 rounded-2xl flex flex-col justify-center shadow-lg border border-slate-700">
            <h4 class="text-xl font-bold text-white mb-5 text-center">Quick Contact</h4>
            <a href={phoneUrl} class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg mb-4 transition-all shadow-md">
                <i class="fa-solid fa-phone mr-2"></i> Call Now
            </a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" class="block w-full text-center bg-[#087A35] text-white hover:bg-[#06662D] font-bold py-4 rounded-lg mb-4 transition-all shadow-md">
                <i class="fa-brands fa-whatsapp text-lg mr-2"></i> Message on WhatsApp
            </a>
            
            <!-- Email Button Added Here -->
            <a href={`mailto:${site.email}`} class="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-lg transition-all shadow-md">
                <i class="fa-solid fa-envelope mr-2"></i> Email Us
            </a>
        </div>
    </div>
</footer>
