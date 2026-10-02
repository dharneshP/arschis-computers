<script lang="ts">
    import { serviceNames, site } from '$lib/site';

    const businessId = `${site.url}/#business`;
    const graph = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': ['LocalBusiness', 'ComputerStore'],
                '@id': businessId,
                name: site.name,
                url: `${site.url}/`,
                logo: site.logoUrl,
                image: site.logoUrl,
                telephone: site.phone,
                email: site.email,
                address: {
                    '@type': 'PostalAddress',
                    ...site.address
                },
                areaServed: {
                    '@type': 'City',
                    name: 'Erode'
                },
                openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                    opens: site.openingHours.opens,
                    closes: site.openingHours.closes
                }
            },
            ...serviceNames.map((name) => ({
                '@type': 'Service',
                '@id': `${site.url}/#service-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                name,
                url: `${site.url}/#services`,
                areaServed: {
                    '@type': 'City',
                    name: 'Erode'
                },
                provider: { '@id': businessId }
            }))
        ]
    };
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`}
</svelte:head>
