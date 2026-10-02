import {allGalleryQuery} from '$lib/gallery';
import {loadGallery} from '$lib/server/gallery';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async () => ({galleryData: await loadGallery(allGalleryQuery)});
