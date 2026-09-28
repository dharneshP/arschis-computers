import { json, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ setHeaders }: RequestEvent) {
    setHeaders({
        'Cache-Control': 'public, s-maxage=86400'
    });
    
    const PLACE_ID = env.GOOGLE_PLACE_ID; 
    const API_KEY = env.GOOGLE_API_KEY;
    
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        
        // Return the actual reviews array to the website!
        return json(data.result?.reviews || []);

    } catch (err) {
        return json([], { status: 500 });
    }
}