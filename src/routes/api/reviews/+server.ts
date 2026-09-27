import { json, type RequestEvent } from '@sveltejs/kit';

export async function GET({ setHeaders }: RequestEvent) {
    // Cache the reviews for 24 hours
    setHeaders({
        'Cache-Control': 'public, s-maxage=86400'
    });
    
    // Your verified credentials
    const PLACE_ID = 'ChIJ9frTUmlvqTsR_nrKmXlyrdc'; 
    const API_KEY = 'AIzaSyDZ5ujD3QWPXennICznJz_i3xpluGG83EA';
    
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