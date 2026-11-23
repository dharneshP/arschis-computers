<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { getWhatsAppUrl, phoneUrl } from '$lib/contact';
    let { message, light = false, class: className = '' }: { message?: string; light?: boolean; class?: string } = $props();
</script>

<div class="flex flex-wrap gap-3 {className}">
    <Button href={phoneUrl} variant={light ? 'light' : 'secondary'}><i class="fa-solid fa-phone" aria-hidden="true"></i> Call Now</Button>
    <Button href={getWhatsAppUrl(message)} target="_blank" variant="whatsapp"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp</Button>
</div>
