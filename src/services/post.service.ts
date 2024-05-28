import { getCollection, type CollectionEntry } from 'astro:content';
import { HEADLESS_STUB } from '../consts';
import { readItems } from "@directus/sdk";
import directus, { type HeadlessPost } from '../lib/directus';

export async function getPosts() {
  const internalCollection = await getCollection("blog");
  const directusCollection = await getTransformedHeadlessPosts();

  return [...directusCollection, ...internalCollection]
  .filter((b) => b.data.draft !== true)
  .sort((a, b) => {
    return b.data.publishDate.valueOf() > a.data.publishDate.valueOf() ? 1 : -1;
  });
}

async function getTransformedHeadlessPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await directus.request(
    readItems("posts", {
      fields: [
        "slug",
        "status",
        { author: ["name", "avatar"] },
        "title",
        "content",
        "snippet",
        "cover",
        "category",
        "tags",
        "user_created",
        "user_updated",
        "date_created",
        "date_updated",
        "published_date",
      ],
      sort: ["-published_date"],
    })
  );
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return transformHeadlessPosts(posts as any);
}

/** Transform REST response to Astro Collection */
function transformHeadlessPosts(posts: HeadlessPost[]): CollectionEntry<'blog'>[] {
  return posts.map(p => {
    return {
      id: p.slug, // MD uses ID?
      slug: p.slug,
      body: p.content,
      collection: 'posts',
      data: {
        draft: p.status.toLowerCase() === 'draft',
        title: p.title,
        snippet: p.snippet,
        cover: `${HEADLESS_STUB}/assets/${p.cover}`,
        // cover: {
        //   // src: `${HEADLESS_STUB}/assets/${p.cover}?width=496&amp;height=280`,
        //   // src: `${HEADLESS_STUB}/assets/${p.cover}?width=496&height=280`,
        //   src: `${HEADLESS_STUB}/assets/${p.cover}`,
        //   alt: 'My alt text', // TODO
        //   format: 'jpg',
        //   width: 496,
        //   height: 280
        // },
        coverAlt: p.title,
        category: p.category,
        tags: p.tags,
        author: p.author.name,
        authorId: p.author.id,
        authorAvatar: p.author.avatar,
        publishDate: new Date(p.published_date),
        createdDate: p.date_created ? new Date(p.date_created) : undefined,
        updatedDate: p.date_updated ? new Date(p.date_updated) : undefined,
        __source: 'HEADLESS'
      }
    }
  }) as unknown as CollectionEntry<'blog'>[];
}
