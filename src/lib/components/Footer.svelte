<script lang="ts">
    import { businessPhone, phoneUrl, secondaryBusinessPhone, secondaryPhoneUrl } from '$lib/contact';
</script>

<footer class="bg-[#0F172A] text-slate-300 pt-16 pb-6 md:pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 1 column on mobile, 3 columns on desktop -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            
            <!-- Column 1: Business Information -->
            <div class="space-y-5">
                <h3 class="text-white text-xl font-extrabold tracking-wide mb-2">Arschis Computers</h3>
                <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                        <i class="fa-solid fa-location-dot mt-1 text-[#DC2626]"></i>
                        <span class="text-sm">
                            8, NSTV Building,<br />
                            Brough Road, Fort<br />
                            Erode - 638001
                        </span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fa-solid fa-phone text-[#DC2626]"></i>
                        <a href={phoneUrl} class="text-sm hover:text-white transition-colors">{businessPhone}</a>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fa-solid fa-phone text-[#DC2626]"></i>
                        <a href={secondaryPhoneUrl} class="text-sm hover:text-white transition-colors">{secondaryBusinessPhone}</a>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fa-solid fa-clock text-[#DC2626]"></i>
                        <span class="text-sm">10:00 AM - 9:00 PM</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fa-solid fa-envelope text-[#DC2626]"></i>
                        <a href="mailto:arschiscomputers@gmail.com" class="text-sm hover:text-white transition-colors">arschiscomputers@gmail.com</a>
                    </li>
                    <li class="flex items-start gap-3">
                        <i class="fa-solid fa-user-tie mt-1 text-[#DC2626]"></i>
                        <span class="text-sm">Prop: P. Vasanthakumar B.Sc., DECE.</span>
                    </li>
                </ul>
            </div>

            <!-- Mobile Separator -->
            <hr class="border-slate-800 md:hidden block" />

            <!-- Column 2: Quick Links -->
            <div>
                <h3 class="text-white text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block border-b-[#FFD700]">Quick Links</h3>
                <!-- Grid cols-2 on mobile for compact layout, cols-1 on desktop -->
                <ul class="grid grid-cols-2 md:grid-cols-1 gap-3 text-sm">
                    <li><a href="/" class="hover:text-[#FFD700] transition-colors">Home</a></li>
                    <li><a href="/store" class="hover:text-[#FFD700] transition-colors">Products</a></li>
                    <li><a href="/gallery" class="hover:text-[#FFD700] transition-colors">Our Work</a></li>
                    <li><a href="/#contact" class="hover:text-[#FFD700] transition-colors">Contact</a></li>
                </ul>
            </div>

            <!-- Mobile Separator -->
            <hr class="border-slate-800 md:hidden block" />

            <!-- Column 3: Services -->
            <div>
                <h3 class="text-white text-lg font-bold mb-6 border-b border-slate-700 pb-2 inline-block border-b-[#FFD700]">Our Services</h3>
                <ul class="space-y-3 text-sm">
                    <li><a href="/#services" class="hover:text-[#FFD700] transition-colors">Laptop & PC Service</a></li>
                    <li><a href="/store" class="hover:text-[#FFD700] transition-colors">Computer Sales</a></li>
                    <li><a href="/#services" class="hover:text-[#FFD700] transition-colors">Printer Sales & Service</a></li>
                    <li><a href="/#services" class="hover:text-[#FFD700] transition-colors">Networking</a></li>
                    <li><a href="/#services" class="hover:text-[#FFD700] transition-colors">IT Support & AMC</a></li>
                </ul>
            </div>

        </div>

        <!-- Mobile Separator before copyright -->
        <hr class="border-slate-800 mt-10 md:hidden block" />

        <!-- Copyright -->
        <div class="border-t-0 md:border-t md:border-slate-800 mt-6 md:mt-12 pt-4 md:pt-8 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2026 Arschis Computers. All rights reserved.</p>
            <p class="text-slate-500">Serving Erode for 20+ Years</p>
        </div>
    </div>
</footer>
