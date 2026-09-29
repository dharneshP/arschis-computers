<script lang="ts">
    // SvelteKit's built-in store to check the error status (like 404)
    import { page } from '$app/stores';
    
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
    <title>Page Not Found | Arschis Computers</title>
</svelte:head>

<Header />

<!-- Full screen flexbox layout perfectly centers the error card -->
<main class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 pt-20 pb-12 text-center">
    
    <div class="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
        
        <!-- Fun "Laptop Medical" Icon -->
        <div class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <i class="fa-solid fa-laptop-medical text-5xl text-[#DC2626]"></i>
        </div>
        
        <!-- Shows '404' or whichever error code occurred -->
        <h1 class="text-7xl font-black text-slate-900 tracking-tighter mb-2">{$page.status}</h1>
        
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3">
            {#if $page.status === 404}
                Page Not Found
            {:else}
                Something went wrong
            {/if}
        </h2>
        
        <p class="text-slate-600 text-lg mb-8 leading-relaxed">
            We can't seem to find the page you're looking for. But don't worry — fixing broken things is exactly what we do!
        </p>
        
        <!-- Big red button to guide them back to safety -->
        <a 
            href="/" 
            class="inline-flex items-center justify-center w-full bg-[#DC2626] hover:bg-[#b91c1c] text-white px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 group"
        >
            <i class="fa-solid fa-house mr-3 group-hover:-translate-x-1 transition-transform"></i>
            Return to Homepage
        </a>
        
    </div>
    
</main>

<Footer />