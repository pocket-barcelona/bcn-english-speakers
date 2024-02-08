import { getCollection } from 'astro:content';

export async function getPosts() {
  return (await getCollection("blog"))
  .filter((b) => b.data.draft !== true)
  .sort((a, b) => {
    return b.data.publishDate.valueOf() > a.data.publishDate.valueOf() ? 1 : -1;
  });
}
