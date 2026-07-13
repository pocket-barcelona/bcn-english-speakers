import { createDirectus, rest } from '@directus/sdk';
import { HEADLESS_STUB } from '../consts';
import type { Barrio } from '../data/apps/barrios';

// const base = import.meta.env.DEV ? '' : HEADLESS_STUB;
// const base = import.meta.env.DEV ? 'http://localhost:4321/api' : HEADLESS_STUB;
const base = HEADLESS_STUB;

export type HeadlessGlobal = {
  id: number;
  title: string;
  description: string;
}

export type HeadlessAuthor = {
  id: number;
  /** Formatted, like: Bob */
  name: string;
  /** File UUID */
  avatar: string | null;
  author_type: string;
}

export type HeadlessPage = {
  /** The page slug ID used for the unique URL */
  slug: string;
  title: string;
  content: string;
}

export type HeadlessFile = {
  id: string;
  /** Good for image alt text */
  title: string;
  width: number;
  height: number;
  /** Like image/jpeg */
  type: string;
}

export type HeadlessPost = {
  /** The post slug ID used for the unique URL */
  slug: string;
  status: PostStatus;
  author: HeadlessAuthor; // provided Directus fields are set: https://cms.pocketbarcelona.com/items/posts/primavera-sound-festival?fields[]=*&fields[]=author.id&fields[]=author.name&fields[]=author.avatar
  title: string;
  /** The post HTML */
  content: string;
  snippet: string;
  /** Image UUID */
  cover: HeadlessFile;
  category: PostCategory;
  tags: string[];
  published_date: string;
  user_created: string;
  user_updated: string | null;
  date_created: string;
  date_updated: string | null;
  // hide_post?: boolean;
  // related_post?: string;
}

type PostStatus = 'draft' | 'published' | 'archived';
type PostCategory = 'News' | 'Going Out' | 'Gastro' | 'Getting Around' | 'Guides';


export type HeadlessGroup = {
  /** The group ID used for the unique URL */
  id: string;
  icon: string;
  link: string;
  name: string;
  slug: string;
  description: string;
}

export type ImageSizes = "thumb" | "small" | "medium" | "large" | "xlarge";
export type ImageAssetsSize = "thumb" | "medium" | "large";
export interface ImageAssets {
  size: ImageAssetsSize;
  url: string;
  /** For ordering */
  order?: number;
}

export type PlaceCategory = { id: number; value: string; emoji: string; };
export const PLACE_CATEGORIES: PlaceCategory[] = [
  { id: 0, value: 'Unknown', emoji: '?' },
  { id: 1, value: 'Beaches', emoji: '🏖️' },
  { id: 2, value: 'Bars & Restaurants', emoji: '🍸' },
  { id: 3, value: 'Experiences', emoji: '🎭' }, // Tourist Attractions?
  { id: 4, value: 'Festivals', emoji: '🎉' },
  { id: 5, value: 'Plazas', emoji: '🏠' },
  { id: 6, value: 'Trips', emoji: '🚊' },
  { id: 7, value: 'Museums', emoji: '🎟️' },
  { id: 8, value: 'Viewpoints', emoji: '🌅' },
  { id: 9, value: 'Buildings', emoji: '🕌' },
  { id: 10, value: 'Shopping', emoji: '🛍️' },
  { id: 11, value: 'Parks', emoji: '🌳' },
  { id: 12, value: 'Sports', emoji: '🏓' },
];


// @todo - COPIED FROM BACKEND!
export type HeadlessPlace = {
  /** The place ID */
	placeId: number;
	/** If the place is active in listings (1=Visible, 0=Hidden) */
	active: boolean;
	/** The province ID that this place is in. See Provinces */
	provinceId: number;
	/** The town that this place is in, ex. Barcelona or Girona... */
	town: string;
	/** The neighbourhood ID that this place is in. Note - there is a special ID for places outside of Barcelona which is 86 */
	barrioId: number;
	/** The category ID for this place. See Categories */
	categoryId: number;
	/** 0=Has no posterimage. 1=Has poster image */
	hasImage: boolean;
	/** The official name of the place */
	labelCat: string;
	/** The name of the place in Spanish */
	labelEsp: string;
	/** The name of the place in English */
	labelEng: string;
	/**
	 * slug is a URL-friendly version of the place name, without a slash
	 */
	slug: string;
	/**
	 * Useful remarks about the place
	 * Ex. There is an entrance fee to get into the castle but it includes entrance to the museum, too
	 */
	remarks: string;
	/**
	 * A short description of the place
	 * Ex. A busy market for the local people of Barceloneta
	 */
	description: string;
	/** The amount of time we would recommend to spend at the place, or doing the activity */
	timeRecommended: number;
	/** The best time of day to visit */
	bestTod: number;
	/** The approximate level of commitment required to visit the place (Scale is 1-5) */
	commitmentRequired: number;
	/**
	 * The estimated price people could spend at this place or doing this activity
	 * Options: Free
	 * Very cheap, Cheap, Moderate, Quite expensive, Very expensive
	 * @todo - This does not factor in booking fees, tickets, transport costs or buying anything while you are there
	 */
	price: number;
	/**
	 * 1=Free to visit and look around.
	 * 0=Not really possible to visit, e.g. need to pay to enter so only worth going if paying.
	 * -1=Not sure or no data yet.
	 * Ex. Sagrada Familia (1) is interesting to see, even without paying to go in!
	 */
	freeToVisit: number;
	/** The level of suitability for children */
	childrenSuitability: number;
	/** The level of suitability for teenagers */
	teenagerSuitability: number;
	/** True if place is considered a tourist attraction */
	touristAttraction: boolean;
	/** @deprecated - make different to touristAttraction? Whether or not the place is considered popular for tourists, by us. TRUE=Classic or well-known tourist attraction */
	popular: boolean;
	/** A number between 0-100 in order to boost the place listing in search results. Values are normalised, so most places have zero */
	boost: number;
	/** 1=Availability only part or once in the year. 0=Available all year round */
	annualOnly: boolean;
	/**
	 * @todo - make Integer: Spring, Summer, Autumn, Winter bitwise value
	 * TRUE=Seasonal availability, FALSE=Available or accessible in all seasons
	 * */
	seasonal: boolean;
	/** 0=Can be done inside a day. 1=Probably requires a full day to do. 2=Requires more, ex. is outside the city */
	daytrip: number;
	/** Place is available on a daily basis? */
	availableDaily: boolean;
	/** Place is available on a sunday? */
	availableSundays: boolean;
	/** Place requires booking?  */
	requiresBooking: number;
	/** The metro/train zone number for this place, ex. 1, 2, 3... (applies to Barcelona only). -1 and -2 are outside of Barcelona */
	metroZone: number;
	/** Place is a physical landmark? */
	isLandmark: boolean;
	/** @todo */
	isPhysicalLocation: number;
	/** The place latitude, like 41.37... */
	latitude: number;
	/** The place longitude, like 2.19... */
	longitude: number;
	/** If the lat/lng value is accurate to a point on the map, or not */
	latlngAccurate: boolean;
	/** The Google Maps recommended zoom. Default=0 (UI will decide), Number=zoom Ex. 18 */
	mapZoom: number;
	/** The official website for this place */
	website: string;
	/** 0=Does not have a related place. [ID]=The ID of the related place to this one */
	relatedPlaceId: number;
	/** 1=Permission to use (taken by us). 0=From stock photo or open source location. -1=Not taken by us, not free to use */
	photoOwnership: number;
	/** A list of tags to assist with searching places. Ex. beach,playa,platja */
	tags: string;
	/** From Google Places API - also use for our local places list */
	status: string;

	// mapped...
	images: ImageAssets[];
	category: PlaceCategory;
	barrio: Barrio;
	metrics: {
		teenagerSuitability: string[],
		childrenSuitability: string[],
		commitmentRequired: string[],
		price: string[],
		bestTod: string[],
		timeRecommended: string[],
		booking: string[]
	}
}

type HeadlessSchema = {
  authors: HeadlessAuthor[]; // set schema so readItems knows relation structure
  cover: HeadlessFile[]; // set schema so readItems knows relation structure
  posts: HeadlessPost[];
  global: HeadlessGlobal;
  pages: HeadlessPage[];
  groups: HeadlessGroup[];
  places: HeadlessPlace[]
}

/** Convert a Directus file/image asset UUID to a full URL */
export function convertAssetIdToUrl(assetId: string): string {
  return `${HEADLESS_STUB}/assets/${assetId}` // Astro needs the full URL for Directus image assets
}

const directus = createDirectus<HeadlessSchema>(`${base}/`).with(rest());

export default directus;
