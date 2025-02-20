import { getCollection, type CollectionEntry } from 'astro:content';
import { HEADLESS_STUB } from '../consts';
import { readItems } from "@directus/sdk";
import directus, { type HeadlessPost } from '../lib/directus';

type UnifiedBlogPost = CollectionEntry<'blog'>;
/**
 * @param includeHiddenPosts Allow posts to be hidden in the main feed but included in getStaticPaths()
 */
export async function getMergedPosts(includeHiddenPosts = false) {
  const internalCollection = await getCollection("blog");
  let directusCollection: UnifiedBlogPost[] = [];
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

export function filterAndSortPosts(posts: UnifiedBlogPost[], includeHiddenPosts = false): UnifiedBlogPost[] {
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
async function getTransformedHeadlessPosts(): Promise<UnifiedBlogPost[]> {
  // example: https://content.pocketbarcelona.com/items/posts/primavera-sound-festival?fields[]=*&fields[]=author.id&fields[]=author.name&fields[]=author.avatar
  const posts = await directus.request(
    readItems("posts", {
      fields: [
        "slug",
        "status",
        { author: ["id", "name", "avatar"] },
        "title",
        "content",
        "snippet",
        { cover: ["id", "title", "width", "height", "type"] },
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

function directusAuthorIdToLocalAuthor(authorId: number): string {
  switch (authorId) {
    case 1:
      return 'darryl';
    case 2:
      return 'uriel';
    case 3:
      return 'brata';
    case 4:
      return 'owen';
    default:
      return 'pb';
  }
}

/** Astro only supports these: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif" */
function mapDirectusImageTypeToAstroType(imageType: string): string {
  switch (imageType) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/avif':
      return 'avif';
    case 'image/tiff':
      return 'tiff';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/svg':
      return 'svg';
    default:
      return 'jpg';
  }
}

/** Transform REST response to Astro Collection */
export function transformHeadlessPosts(posts: HeadlessPost[]): UnifiedBlogPost[] {
  return posts.map(p => {
    // make sure the post was updated more than a whole day after the original post date
    // this protects against all directus posts showing as updated just because we changed that post status to published!
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const createdDate = p.date_created ? new Date(p.date_created) : undefined;
    const updatedDate = p.date_updated ? new Date(p.date_updated) : undefined;
    let updatedAfterPublished = false;
    if (updatedDate && createdDate) {
      updatedAfterPublished = updatedDate.valueOf() - createdDate.valueOf() > (oneDayInMs * 2); // 2 days
    }

    const mapped: { __source: string; } & UnifiedBlogPost= {
      id: p.slug,
      slug: p.slug,
      body: p.content,
      collection: 'blog',
      data: {
        draft: p.status.toLowerCase() !== 'published', // Markdown has draft:boolean, Directus has status=draft|published|archived. FE only wants to know if it should show the post, or not
        title: p.title,
        snippet: p.snippet,
        // cover: `${HEADLESS_STUB}/assets/${p.cover}`,
        cover: {
          // src: `${HEADLESS_STUB}/assets/${p.cover}?width=496&amp;height=280`,
          // src: `${HEADLESS_STUB}/assets/${p.cover}?width=496&height=280`,
          src: `${HEADLESS_STUB}/assets/${p.cover.id}`,
          format: mapDirectusImageTypeToAstroType(p.cover.type) as 'jpg', // hack TS!
          width: p.cover.width,
          height: p.cover.height,
        },
        coverAlt: p.cover.title || p.title,
        category: p.category,
        tags: p.tags,
        author: p.author.name,
        authorId: directusAuthorIdToLocalAuthor(p.author.id),
        authorAvatar: p.author.avatar || '',
        publishDate: new Date(p.published_date),
        // createdDate: p.date_created ? new Date(p.date_created) : undefined,
        updatedDate: p.date_updated && updatedAfterPublished ? new Date(p.date_updated) : undefined,
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      render: undefined as unknown as any,
      __source: 'HEADLESS' // inject identifier, if needed explicitly
    };
    return mapped;
  });
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

