<script lang="ts">
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';

    const whatsappUrl = getWhatsAppUrl('Hi Arschis Computers, I need help with computer or IT service.');
</script>

<section class="bg-[#0B1F3A] px-4 py-12 text-white sm:py-14" aria-labelledby="contact-cta-heading">
    <div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
        <div>
            <h2 id="contact-cta-heading" class="text-3xl font-extrabold">Need Computer or IT Service?</h2>
            <p class="mt-2 text-slate-300">Contact Arschis Computers for service and sales enquiries.</p>
        </div>
        <div class="flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-14 items-center justify-center rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white transition-colors hover:bg-green-700">
                <i class="fa-brands fa-whatsapp mr-2 text-xl" aria-hidden="true"></i> WhatsApp
            </a>
            <a href={phoneUrl} class="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-[#F5C400] px-6 py-3 font-bold text-[#F5C400] transition-colors hover:bg-[#F5C400] hover:text-[#071426]">
                <i class="fa-solid fa-phone mr-2" aria-hidden="true"></i> Call Now
            </a>
        </div>
    </div>
</section>
