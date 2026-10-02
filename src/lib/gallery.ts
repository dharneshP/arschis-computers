export interface GalleryImage {
	asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
	alt?: string;
}

export interface GalleryItem {
	_id: string;
	title: string;
	mediaType: 'image' | 'video';
	image?: GalleryImage;
	video?: string;
	videoThumbnail?: GalleryImage;
	category: string;
	description?: string;
	workDate?: string;
	featured?: boolean;
	displayOrder?: number;
}

export interface GalleryLoadResult {
	items: GalleryItem[];
	status: 'success' | 'empty' | 'error';
}

export const galleryCategories = ['All', 'PC & Laptop', 'Printer', 'Networking', 'Shop', 'Other'];

const imageProjection = `{
	asset->{url, metadata {dimensions {width, height}}},
	alt
}`;

const galleryProjection = `{
	_id, title, mediaType, category, description, workDate, featured, displayOrder, video,
	"image": image${imageProjection},
	"videoThumbnail": videoThumbnail${imageProjection}
}`;

export const allGalleryQuery = `*[_type == "galleryItem" && !(_id in path("drafts.**"))] | order(coalesce(displayOrder, 999999) asc, workDate desc, _createdAt desc)${galleryProjection}`;

export const featuredGalleryQuery = `*[_type == "galleryItem" && !(_id in path("drafts.**")) && featured == true] | order(coalesce(displayOrder, 999999) asc, workDate desc, _createdAt desc)[0...6]${galleryProjection}`;

export function getSanityImageUrl(image: GalleryImage | undefined, width: number) {
	if (!image?.asset?.url) return undefined;
	const url = new URL(image.asset.url);
	url.searchParams.set('w', String(width));
	url.searchParams.set('fit', 'crop');
	url.searchParams.set('auto', 'format');
	return url.href;
}
