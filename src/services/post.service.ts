import { getCollection, type CollectionEntry } from 'astro:content';
import { HEADLESS_STUB } from '../consts';
import { readItems } from "@directus/sdk";
import directus, { type HeadlessPost } from '../lib/directus';

/**
 * @param includeHiddenPosts Allow posts to be hidden in the main feed but included in getStaticPaths()
 */
export async function getMergedPosts(includeHiddenPosts = false) {
  const internalCollection = await getCollection("blog");
  let directusCollection: CollectionEntry<'blog'>[] = [];
  // Local dev: If Directus CMS is down, comment out the below try->catch to bypass the external post content!
  try {
    directusCollection = await getTransformedHeadlessPosts();
  } catch (error) {
    console.error(error);
    throw new Error('Headless CMS is not responding...is Directus down?');
  }
  return filterAndSortPosts(
    [
      ...directusCollection,
      ...internalCollection,
    ], includeHiddenPosts
  )
}

export function filterAndSortPosts(posts: CollectionEntry<'blog'>[], includeHiddenPosts = false): CollectionEntry<'blog'>[] {
  return posts
    .filter(({ data }) => {
      if (data.draft === true) {
        return false;
      }
      if (data.hidePost === true && includeHiddenPosts !== true) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      return b.data.publishDate.valueOf() > a.data.publishDate.valueOf() ? 1 : -1;
    });
}

/** Transform a Directus post into our blog post type */
async function getTransformedHeadlessPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await directus.request(
    readItems("posts", {
      fields: [
        "slug",
        "status",
        { author: ["id", "name", "avatar"] },
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
  return transformHeadlessPosts(posts);
}

/** Transform REST response to Astro Collection */
function transformHeadlessPosts(posts: HeadlessPost[]): CollectionEntry<'blog'>[] {
  return posts.map(p => {
    // make sure the post was updated more than a whole day after the original post date
    // this protects against all directus posts showing as updated just because we changed that post status to published!
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const createdDate = p.date_created ? new Date(p.date_created) : undefined;
    const updatedDate = p.date_updated ? new Date(p.date_updated) : undefined;
    let updatedAfterPublished = false;
    if (updatedDate && createdDate) {
      updatedAfterPublished = updatedDate.valueOf() - createdDate.valueOf() > oneDayInMs;
    }

    return {
      id: p.slug, // MD uses ID?
      slug: p.slug,
      body: p.content,
      collection: 'posts',
      data: {
        draft: p.status.toLowerCase() !== 'published', // Markdown has draft:boolean, Directus has status=draft|published|archived. FE only wants to know if it should show the post, or not
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
        updatedDate: p.date_updated && updatedAfterPublished ? new Date(p.date_updated) : undefined,
        __source: 'HEADLESS' // inject identifier, if needed explicitly
      }
    }
  }) as unknown as CollectionEntry<'blog'>[];
}


async function getHeadlessPostById(slug: string): Promise<{ data: HeadlessPost; }> {
  const endpoint = `${HEADLESS_STUB}/items/posts/${slug}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return data as Promise<{ data: HeadlessPost; }>;
}

export async function getPost(slug: string | undefined): Promise<{ data: HeadlessPost | null}> {
  if (!slug) return { data: null };
  
  try {
    const directusPost = await getHeadlessPostById(slug);
    return directusPost;
  } catch (e) {
    console.error(e);
    return { data: null };
  }
}


export function getRelatedNextPrevPosts(
	postData: CollectionEntry<"blog">,
	allPosts: CollectionEntry<"blog">[],
): {
	next: CollectionEntry<"blog"> | undefined;
	prev: CollectionEntry<"blog"> | undefined;
  related: CollectionEntry<"blog"> | undefined;
} {
	let next = undefined;
  let prev = undefined;
	let related = undefined;

	if (postData.data.nextPost) {
		next = allPosts.find((p) => p.slug === postData.data.nextPost);
	}
	if (postData.data.prevPost) {
		prev = allPosts.find((_p) => _p.slug === postData.data.prevPost);
	}
  if (postData.data.relatedPost) {
		related = allPosts.find((_p) => _p.slug === postData.data.relatedPost);
	}
	return {
		next,
		prev,
    related
	};
};

/** Note: Assumes `allPosts` are already filtered and sorted */
export function getChronologicalNextPrevPosts(
	postData: CollectionEntry<"blog">,
	allPosts: CollectionEntry<"blog">[],
): {
	nextPost: CollectionEntry<"blog"> | undefined;
	prevPost: CollectionEntry<"blog"> | undefined;
} {
	let nextPost = undefined;
  let prevPost = undefined;

  const currentPostIndex = allPosts.findIndex((p) => p.id === postData.id);
  if (currentPostIndex !== -1) {
    const nextPostIndex = currentPostIndex - 1;
    const prevPostIndex = currentPostIndex + 1;

    if (nextPostIndex >= 0 && nextPostIndex < allPosts.length) {
      nextPost = allPosts[nextPostIndex];
    }

    if (prevPostIndex >= 0 && prevPostIndex < allPosts.length) {
      prevPost = allPosts[prevPostIndex];
    }
  }
	
	return {
		nextPost,
		prevPost
	};
};

