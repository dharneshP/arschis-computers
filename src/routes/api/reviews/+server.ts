import { json, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ setHeaders }: RequestEvent) {
    setHeaders({
        'Cache-Control': 'public, s-maxage=86400'
    });
    
    const PLACE_ID = env.GOOGLE_PLACE_ID; 
    const API_KEY = env.GOOGLE_API_KEY;
    
    if (!PLACE_ID || !API_KEY) {
        return json({ reviews: [] }, { status: 503 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,url,reviews&key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok || data.status !== 'OK') {
            return json({ reviews: [] }, { status: 502 });
        }

        return json({
            reviews: data.result?.reviews || [],
            rating: data.result?.rating,
            userRatingsTotal: data.result?.user_ratings_total,
            googleMapsUrl: data.result?.url
        });

    } catch (err) {
        return json({ reviews: [] }, { status: 500 });
    }
}
