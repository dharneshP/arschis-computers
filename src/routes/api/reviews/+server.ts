import { json, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ setHeaders }: RequestEvent) {
    const PLACE_ID = env.GOOGLE_PLACE_ID; 
    const API_KEY = env.GOOGLE_API_KEY;
    
    if (!PLACE_ID || !API_KEY) {
        setHeaders({ 'Cache-Control': 'no-store' });
        return json({ reviews: [] }, { status: 503 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,url,reviews&key=${API_KEY}`;
        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        if (!res.ok || data.status !== 'OK') {
            setHeaders({ 'Cache-Control': 'no-store' });
            return json({ reviews: [] }, { status: 502 });
        }

        setHeaders({ 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' });

        return json({
            reviews: data.result?.reviews || [],
            rating: data.result?.rating,
            userRatingsTotal: data.result?.user_ratings_total,
            googleMapsUrl: data.result?.url
        });

    } catch (err) {
        setHeaders({ 'Cache-Control': 'no-store' });
        return json({ reviews: [] }, { status: 500 });
    } finally {
        clearTimeout(timeout);
    }
}
