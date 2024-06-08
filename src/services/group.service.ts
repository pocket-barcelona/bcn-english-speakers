import {type CollectionEntry} from 'astro:content';
import {HEADLESS_STUB} from '../consts';
import {readItems} from "@directus/sdk";
import directus, {type HeadlessGroup} from '../lib/directus';

export async function getGroups() {
  return (await getTransformedHeadlessGroups())
  .sort((a, b) => {
    return b.data.id < a.data.id ? 1 : -1;
  });
}

/** Transform a Directus post into our blog post type */
async function getTransformedHeadlessGroups(): Promise<CollectionEntry<'group'>[]> {
  const groups = await directus.request(
      readItems("groups", {
        fields: [
          "icon",
          "slug",
          "link",
          "name",
          "description",
          "id",
        ],
        sort: ["-id"],
      })
  );
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return transformHeadlessGroups(groups as any);
}

/** Transform REST response to Astro Collection */
function transformHeadlessGroups(groups: HeadlessGroup[]): CollectionEntry<'group'>[] {
  return groups.map(p => {
    return {
      id: p.slug,
      slug: p.slug,
      collection: 'groups',
      data: {
        id: p.id,
        name: p.name,
        description: p.description,
        link: p.link,
        icon: `${HEADLESS_STUB}/assets/${p.icon}`,
        __source: 'HEADLESS' // inject identifier, if needed explicitly
      }
    }
  }) as unknown as CollectionEntry<'group'>[];
}


async function getHeadlessGroupById(slug: string): Promise<{ data: HeadlessGroup; }> {
  const endpoint = `${HEADLESS_STUB}/items/groups/${slug}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return data as Promise<{ data: HeadlessGroup; }>;
}

export async function getGroup(slug: string | undefined): Promise<{ data: HeadlessGroup | null }> {
  if (!slug) return {data: null};

  try {
    return await getHeadlessGroupById(slug);
  } catch (e) {
    console.error(e);
    return {data: null};
  }
}