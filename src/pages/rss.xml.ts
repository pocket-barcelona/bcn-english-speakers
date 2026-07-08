import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getMergedPosts } from '../services/post.service';

export async function GET(context: APIContext) {
  const posts = await getMergedPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}`,
      pubDate: post.data.publishDate,
    })),
  });
}
