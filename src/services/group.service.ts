import { HEADLESS_STUB } from "../consts";
import { readItems } from "@directus/sdk";
import directus, { type HeadlessGroup } from "../lib/directus";

export async function getGroups() {
  return (await getTransformedHeadlessGroups()).sort((a, b) => {
    return b.id < a.id ? 1 : -1; // might not need this if doing sort in directus request
  });
}

/** Fetch Whatsapp Groups from Directus */
async function getTransformedHeadlessGroups(): Promise<
  HeadlessGroup[]
> {
  const groups = await directus.request(
    readItems("groups", {
      fields: ["icon", "slug", "link", "name", "description", "id"],
      sort: ["-id"],
    })
  );
  return groups;
}

async function getHeadlessGroupById(
  slug: string
): Promise<{ data: HeadlessGroup }> {
  const endpoint = `${HEADLESS_STUB}/items/groups/${slug}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return data as Promise<{ data: HeadlessGroup }>;
}

export async function getGroup(
  slug: string | undefined
): Promise<{ data: HeadlessGroup | null }> {
  if (!slug) return { data: null };

  try {
    return await getHeadlessGroupById(slug);
  } catch (e) {
    console.error(e);
    return { data: null };
  }
}
