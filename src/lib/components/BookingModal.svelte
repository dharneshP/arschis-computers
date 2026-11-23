<script lang="ts">
    import { tick } from 'svelte';
    import { isBookingOpen } from '$lib/store';
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    import { bookingServiceCategories, createBookingMessage, validateBooking, type BookingErrors } from '$lib/booking';
    import Dialog from '$lib/components/ui/Dialog.svelte';
    import Button from '$lib/components/ui/Button.svelte';

    let name = $state('');
    let mobile = $state('');
    let selectedServices = $state<string[]>([]);
    let problem = $state('');
    let preferredType = $state('Visit Arschis Store');
    let errors = $state<BookingErrors>({});
    let handoffUrl = $state('');
    let handoffMessage = $state('');
    let handoffState = $state<'opened' | 'blocked' | null>(null);
    let copyStatus = $state('');

    async function handleWhatsAppSubmit(event: SubmitEvent) {
        event.preventDefault();
        const fields = { name, mobile, selectedServices, problem, preferredType };
        errors = validateBooking(fields);
        if (Object.keys(errors).length) {
            await tick();
            (event.target as HTMLFormElement).querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
            return;
        }
        handoffMessage = createBookingMessage(fields);
        handoffUrl = getWhatsAppUrl(handoffMessage);
        copyStatus = '';
        // Keep all form values: a new tab is a handoff, never a confirmed booking.
        try {
            const tab = window.open('about:blank', '_blank');
            if (tab) {
                tab.opener = null;
                tab.location.href = handoffUrl;
                handoffState = 'opened';
            } else handoffState = 'blocked';
        } catch { handoffState = 'blocked'; }
        await tick();
        document.getElementById('booking-handoff')?.focus();
    }
    async function copyMessage() {
        try { await navigator.clipboard.writeText(handoffMessage); copyStatus = 'Message copied. Paste it into WhatsApp.'; }
        catch { copyStatus = 'Select and copy the message below, or call us.'; }
    }
</script>

<Dialog open={$isBookingOpen} onclose={() => $isBookingOpen = false} title="Book a Service" description="Send a service request on WhatsApp. Our team will confirm availability and timing.">
    <form id="booking-form" onsubmit={handleWhatsAppSubmit} novalidate class="space-y-6">
        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label for="booking-name" class="mb-2 block text-sm font-semibold">Your Name *</label>
                <input id="booking-name" name="name" bind:value={name} required minlength="2" maxlength="100" autocomplete="name" class="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'booking-name-error' : undefined} />
                {#if errors.name}<p id="booking-name-error" class="mt-2 text-sm text-brand-red">{errors.name}</p>{/if}
            </div>
            <div>
                <label for="booking-mobile" class="mb-2 block text-sm font-semibold">Mobile Number *</label>
                <input id="booking-mobile" name="mobile" type="tel" inputmode="tel" bind:value={mobile} required maxlength="24" autocomplete="tel" placeholder="10-digit number or +91" class="field" aria-invalid={!!errors.mobile} aria-describedby={errors.mobile ? 'booking-mobile-error' : undefined} />
                {#if errors.mobile}<p id="booking-mobile-error" class="mt-2 text-sm text-brand-red">{errors.mobile}</p>{/if}
            </div>
        </div>
        <fieldset aria-describedby={errors.selectedServices ? 'booking-services-error' : undefined}>
            <legend class="mb-3 text-sm font-semibold">What needs service? * <span class="font-normal text-brand-muted">Select all that apply.</span></legend>
            <div class="grid grid-cols-2 gap-3">
                {#each bookingServiceCategories as service}
                    <label class="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm {selectedServices.includes(service) ? 'border-brand-blue bg-blue-50 text-brand-navy' : 'border-brand-border'}">
                        <input type="checkbox" name="services" value={service} bind:group={selectedServices} class="size-5 rounded text-brand-blue" aria-invalid={!!errors.selectedServices} />{service}
                    </label>
                {/each}
            </div>
            {#if errors.selectedServices}<p id="booking-services-error" class="mt-2 text-sm text-brand-red">{errors.selectedServices}</p>{/if}
        </fieldset>
        <div>
            <label for="booking-problem" class="mb-2 block text-sm font-semibold">Describe the problem *</label>
            <textarea id="booking-problem" name="problem" bind:value={problem} required minlength="5" maxlength="2000" rows="3" placeholder="For example: my laptop is not switching on." class="field resize-y" aria-invalid={!!errors.problem} aria-describedby={errors.problem ? 'booking-problem-error' : undefined}></textarea>
            {#if errors.problem}<p id="booking-problem-error" class="mt-2 text-sm text-brand-red">{errors.problem}</p>{/if}
        </div>
        <fieldset>
            <legend class="mb-3 text-sm font-semibold">Preferred Service</legend>
            <div class="flex flex-col gap-4 sm:flex-row">
                {#each ['Visit Arschis Store', 'On-site Service'] as preference}
                    <label class="flex min-h-11 items-center gap-3 text-sm"><input type="radio" name="service_type" value={preference} bind:group={preferredType} class="size-5 text-brand-blue" />{preference}</label>
                {/each}
            </div>
        </fieldset>
        <p class="text-sm text-brand-muted">Submitting opens WhatsApp with your details. Send the message there; this form does not reserve a service slot.</p>
        <Button type="submit" variant="whatsapp" class="w-full"><i class="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i> Continue on WhatsApp</Button>
    </form>
    {#if handoffState}
        <div id="booking-handoff" tabindex="-1" role="status" class="mt-6 space-y-4 rounded-xl border border-brand-border bg-brand-neutral p-4">
            <p class="font-semibold text-brand-navy">{handoffState === 'blocked' ? 'Your browser could not open WhatsApp.' : 'Continue your request in WhatsApp.'}</p>
            <p class="text-sm text-brand-muted">Your details are still here. Send your message and wait for our team to confirm your service.</p>
            <div class="flex flex-wrap gap-3"><Button href={handoffUrl} variant="whatsapp">Open WhatsApp in this tab</Button><Button onclick={copyMessage} variant="secondary">Copy message</Button></div>
            <p class="text-sm" aria-live="polite">{copyStatus}</p>
            <details><summary class="min-h-11 py-2 text-sm font-semibold">View message to copy manually</summary><textarea readonly aria-label="Service request message" class="field mt-2" rows="8" value={handoffMessage}></textarea></details>
        </div>
    {/if}
    <p class="mt-6 text-center text-sm text-brand-muted">Prefer to talk? <a href={phoneUrl} class="inline-flex min-h-11 items-center font-semibold text-brand-blue underline underline-offset-4">Call Now</a></p>
</Dialog>
