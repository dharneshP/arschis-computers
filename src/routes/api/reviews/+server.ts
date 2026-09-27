import { json, type RequestEvent } from '@sveltejs/kit';
// Import SvelteKit's secure environment variable reader
import { env } from '$env/dynamic/private';

export async function GET({ setHeaders }: RequestEvent) {
    setHeaders({
        'Cache-Control': 'public, s-maxage=86400'
    });
    
    // Securely read the keys from the environment variables
    const PLACE_ID = env.GOOGLE_PLACE_ID; 
    const API_KEY = env.GOOGLE_API_KEY;
    
    // ... (the rest of your try/catch fetch code stays exactly the same)
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // This extracts ONLY the reviews array and sends it to your frontend
        if (data.result && data.result.reviews) {
            return json(data.result.reviews);
        }
        
        return json([]);
    } catch (error) {
        console.error('Failed to fetch Google Reviews:', error);
        return json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}