import { readItems } from "@directus/sdk";
import directus, { type HeadlessPlace } from "../lib/directus";


export async function getPlaces(): Promise<HeadlessPlace[]> {
  const places = await directus.request(
    readItems("places", {
      filter: {
        active: {
          _eq: true
        },
        provinceId: {
          _eq: 2
        }
      },
      limit: -1,
    })
  );
  return places
}


