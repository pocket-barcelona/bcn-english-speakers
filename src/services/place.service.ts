import { readItems } from '@directus/sdk';
import { CDN_STUB } from '../consts';
import type { Barrio } from '../data/apps/barrios';
import { getAllBarrios } from '../data/apps/barrios';
import directus, {
  type HeadlessPlace,
  type ImageAssets,
  type ImageAssetsSize,
  type ImageSizes,
  PLACE_CATEGORIES,
  type PlaceCategory,
} from '../lib/directus';

const BARRIOS = getAllBarrios();

export const getBarrioByPlace = (place: HeadlessPlace): Barrio => {
  const id = place.barrioId;
  for (let i = 0; i < BARRIOS.length; i++) {
    const b = BARRIOS[i];
    if (b.id === id) {
      return b;
    }
    if (b.children) {
      for (let j = 0; j < b.children.length; j++) {
        const child = b.children[j];
        if (child.id === id) {
          return child;
        }
      }
    }
  }
  return {
    id: 0,
    par: 0,
    bar: 'Unknown',
  };
};

export async function getPlaces(): Promise<HeadlessPlace[]> {
  const places = await directus.request(
    readItems('places', {
      filter: {
        active: {
          _eq: true,
        },
        provinceId: {
          _eq: 2,
        },
        isLandmark: {
          _eq: true,
        },
      },
      limit: -1,
    }),
  );

  return places.map((place) => {
    // build images
    const sizes: ImageAssetsSize[] = ['thumb', 'medium', 'large'];
    const images: HeadlessPlace['images'] = sizes.map((s) => {
      const poster = getPoster(place, s);
      return {
        size: s,
        url: poster,
      };
    });

    return {
      ...place,
      images,
      category: getPlaceCategory(place),
      barrio: getBarrioByPlace(place),
      metrics: {
        price: getValuesByBitwiseWeight(place.price, PLACE_PRICES),
        booking: getValuesByBitwiseWeight(place.requiresBooking, PLACE_BOOKING),
        timeRecommended: getValuesByBitwiseWeight(place.timeRecommended, PLACE_TIME_RECOMMENDED),
        bestTod: getValuesByBitwiseWeight(place.bestTod, PLACE_BEST_TIME_OF_DAY),
        commitmentRequired: getValuesByBitwiseWeight(
          place.commitmentRequired,
          PLACE_COMMITMENT_REQUIRED,
        ),
        childrenSuitability: getValuesByBitwiseWeight(
          place.childrenSuitability,
          PLACE_CHILDREN_SUITABILITY,
        ),
        teenagerSuitability: getValuesByBitwiseWeight(
          place.teenagerSuitability,
          PLACE_TEENAGER_SUITABILITY,
        ),
      },
    };
  });
}

/**
 * Return the URL of a place, based on the image size needed
 * @param images
 * @param size The image size
 */
export const getPlaceImage = (images: ImageAssets[], size: ImageSizes): string => {
  const item = images.find((i) => i.size === size);
  if (!item) return '';
  return item.url;
};

/** Default small */
export const getPlaceholderImage = (size: ImageSizes = 'small') => {
  const stub = `${CDN_STUB}/app/places/images/avif/`;
  return `${stub}placeholder_${size}.avif`;
};

/**
 * Get the poster image for a place, given a certain size. If place is set to not have an image, return the placeholder image
 * @param place The place
 * @param size The size of the image required
 * @returns
 */
const getPoster = (place: HeadlessPlace, size: ImageAssetsSize): string => {
  const noImagePoster = `${CDN_STUB}/app/places/images/avif/placeholder_${size}.avif`;
  if (!place.hasImage) return noImagePoster;

  const path = `${CDN_STUB}/app/places/images/avif/${size}/${place.placeId}_poster.avif`;
  return path;
};

export const getPlaceCategory = (place: HeadlessPlace): PlaceCategory => {
  const category = PLACE_CATEGORIES.find((cat) => (place.categoryId = cat.id));
  if (category) return category;
  const unknownCategory = PLACE_CATEGORIES.find((c) => c.id === 0);
  return unknownCategory!;
};

const PLACE_PRICES: { weight: number; value: string }[] = [
  { weight: 1, value: 'Free' },
  { weight: 2, value: 'Very cheap' }, // €0 - €5
  { weight: 4, value: 'Cheap' }, // €5 - €10
  { weight: 8, value: 'Moderate' }, // €10 - €25
  { weight: 16, value: 'Quite expensive' }, // €25 - €50
  { weight: 32, value: 'Very expensive' }, // €50+
];

const PLACE_BOOKING = [
  { weight: 1, value: 'No' },
  { weight: 2, value: 'On arrival' },
  { weight: 4, value: 'Same day' },
  { weight: 8, value: 'In advance' },
  { weight: 16, value: 'Selling fast' },
];

const PLACE_TIME_RECOMMENDED = [
  { weight: 1, value: 'Couple of hours' },
  { weight: 2, value: 'Quarter day' },
  { weight: 4, value: 'Half day' },
  { weight: 8, value: 'Full day' },
  { weight: 16, value: 'Weekend' }, // or 2 days
  { weight: 32, value: 'More' }, // 4 days or more
];

const PLACE_BEST_TIME_OF_DAY = [
  // { weight: 1, value: "Morning" },
  // { weight: 2, value: "Afternoon" },
  // { weight: 4, value: "Evening" },
  // { weight: 8, value: "Night" },
  // { weight: 16, value: "All day" },
  { weight: 1, value: 'Daytime' },
  { weight: 2, value: 'Nighttime' },
  { weight: 4, value: 'Day or Night' },
];

const PLACE_TEENAGER_SUITABILITY = [
  { weight: 1, value: 'Not suitable' },
  { weight: 2, value: 'Suitable' },
  { weight: 4, value: 'Recommended' },
];

const PLACE_COMMITMENT_REQUIRED = [
  { weight: 1, value: 'Casual' },
  { weight: 2, value: 'Easy' }, // Low
  { weight: 4, value: 'Medium' },
  { weight: 8, value: 'Hard' },
  { weight: 16, value: 'Extreme' },
];

const PLACE_CHILDREN_SUITABILITY = [
  { weight: 1, value: 'Not suitable' },
  { weight: 2, value: 'Suitable' },
  { weight: 4, value: 'Recommended' },
  { weight: 8, value: 'Single parents' },
];

// others:
// distance from plaza catalunya/sants station

export const getValuesByBitwiseWeight = (
  bitwise: number,
  options: { weight: number; value: string }[],
): string[] => {
  const values: string[] = [];
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (bitwise & option.weight) {
      values.push(option.value);
    }
  }
  return values;
};
