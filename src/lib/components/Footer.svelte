<script lang="ts">
    import { businessPhone, phoneUrl, secondaryBusinessPhone, secondaryPhoneUrl } from '$lib/contact';
    import { site, businessAddress, businessHoursLabel } from '$lib/site';
    import { googleMapsDirectionsUrl } from '$lib/location';
</script>

<footer class="border-t border-white/10 bg-brand-navy-dark py-12 text-slate-300 sm:py-16">
    <div class="site-container">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
            <div class="min-w-0">
                <h2 class="text-xl font-bold text-white">{site.name}</h2>
                <address class="mt-5 space-y-3 text-sm not-italic">
                    <p>{businessAddress}</p>
                    <p><a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center text-blue-200 underline underline-offset-4 hover:text-white">Get Directions</a></p>
                    <p><a href={phoneUrl} class="inline-flex min-h-11 items-center hover:text-white">{businessPhone}</a></p>
                    <p><a href={secondaryPhoneUrl} class="inline-flex min-h-11 items-center hover:text-white">{secondaryBusinessPhone}</a></p>
                    <p>{businessHoursLabel}</p>
                    <p><a href={'mailto:' + site.email} class="inline-flex min-h-11 items-center break-all hover:text-white">{site.email}</a></p>
                    <p>Prop: {site.proprietor}</p>
                </address>
            </div>
            <nav aria-label="Footer navigation">
                <h2 class="mb-4 text-base font-semibold text-white">Quick Links</h2>
                <ul class="grid grid-cols-2 gap-x-4 md:grid-cols-1">
                    {#each [{label:'Home',href:'/'},{label:'Shop',href:'/store'},{label:'Services',href:'/#services'},{label:'About',href:'/#about'},{label:'Our Work',href:'/gallery'},{label:'Contact',href:'/#contact'},{label:'FAQs',href:'/faq'}] as link}
                        <li><a class="inline-flex min-h-11 items-center text-sm hover:text-white" href={link.href}>{link.label}</a></li>
                    {/each}
                </ul>
            </nav>
            <nav aria-label="Footer product categories"><h2 class="mb-4 text-base font-semibold text-white">Shop by Category</h2><ul>{#each [{label:'Laptops',href:'/store/laptops/'},{label:'Desktops',href:'/store/desktops/'},{label:'Monitors',href:'/store/monitors/'},{label:'Printers',href:'/store/printers/'}] as category}<li><a href={category.href} class="inline-flex min-h-11 items-center text-sm hover:text-white">{category.label}</a></li>{/each}</ul></nav>
            <nav aria-label="Footer services">
                <h2 class="mb-4 text-base font-semibold text-white">Our Services</h2>
                <ul>
                    {#each [{label:'Laptop Service',href:'/laptop-service-erode/'},{label:'Computer Service',href:'/computer-service-erode/'},{label:'Computer Sales',href:'/store'},{label:'Printer Service',href:'/printer-service-erode/'},{label:'Networking',href:'/#services'},{label:'IT Support & AMC',href:'/#services'}] as link}
                        <li><a class="inline-flex min-h-11 items-center text-sm hover:text-white" href={link.href}>{link.label}</a></li>
                    {/each}
                </ul>
            </nav>
        </div>
        <div class="mt-10 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-sm md:flex-row">
            <p>&copy; 2026 {site.name}. All rights reserved.</p><p>Computer sales, service &amp; IT support</p>
        </div>
    </div>
</footer>
