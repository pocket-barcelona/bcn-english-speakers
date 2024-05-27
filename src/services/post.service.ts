import { getCollection, type CollectionEntry } from 'astro:content';


export async function getPosts() {
  const internalCollection = await getCollection("blog");
  
  const directusCollection = await getTransformedHeadlessPosts();
  
  return [...internalCollection, ...directusCollection]
  .filter((b) => b.data.draft !== true)
  .sort((a, b) => {
    return b.data.publishDate.valueOf() > a.data.publishDate.valueOf() ? 1 : -1;
  });
}


const HEADLESS_STUB = 'http://ec2-3-79-189-20.eu-central-1.compute.amazonaws.com:8055';

async function getTransformedHeadlessPosts(): Promise<CollectionEntry<'blog'>[]> {
  const endpoint = `${HEADLESS_STUB}/items/articles`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  const augmented = (data.data as DirectusPost[]).map(p => {
    return {
      ...p,
      __source: 'HEADLESS'
    }
  });

  return transformHeadlessPosts(augmented);
}

/** Transform REST response to Astro Collection */
function transformHeadlessPosts(posts: DirectusPost[]): CollectionEntry<'blog'>[] {
  return posts.map(p => {
    return {
      id: p.id.toString(),
      slug: 'test-post',
      body: 'test',
      collection: 'blog',
      data: {
        draft: false,
        title: p.title,
        snippet: p.snippet,
        cover: {
          // src: `${HEADLESS_STUB}/assets/${p.cover}?width=496&amp;height=280`,
          src: `${HEADLESS_STUB}/assets/${p.cover}?width=496&height=280`,
          alt: 'My alt text', // TODO
          format: 'jpg',
          width: 720,
          height: 480
        },
        coverAlt: 'foo',
        category: p.category,
        tags: p.tags,
        author: 'Darryl',
        authorId: 'darryl',
        publishDate: new Date(p.date_created),
        updatedDate: p.date_updated !== p.date_created ? new Date(p.date_updated) : undefined
      }
    }
  }) as unknown as CollectionEntry<'blog'>[];
}


type HeadlessCategoryType = 'News' | 'Going Out' | 'Gastro' | 'Getting Around' | 'Guides';
type DirectusPost = {
  id: number;
  status: 'published' | 'draft' | 'archive';
  user_created: string; // like 'ff2eeaf6-b526-4c01-9d7d-b19f64320e7e'
  date_created: string; // like '2024-05-24T07:28:06.915Z'
  user_updated: string; // like 'ff2eeaf6-b526-4c01-9d7d-b19f64320e7e'
  date_updated: string; // like '2024-05-24T07:35:22.629Z'
  title: string; // like 'Nova Mar Bella Beach Reopens After Storm Repairs'
  content: string; // like '<p>The reconstruction of the seawall...</p>\n<p>More content</p>'
  snippet: string; // like 'The Nova Mar Bella beach in Barcelona's Sant Martí district has reopened after undergoing emergency repairs due to storm damage.'
  cover: string; // like '845ecf3b-2e36-4abc-a813-4dacfc56ebb7'
  category: HeadlessCategoryType,
  tags: string[];
  /** Need to diferentiate between Headless and Markdown posts */
  __source: 'HEADLESS' | string;
};