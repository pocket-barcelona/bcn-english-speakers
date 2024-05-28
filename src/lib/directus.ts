import { createDirectus, rest, } from '@directus/sdk';

type Global = {
  id: number;
  title: string;
  description: string;
}

type Author = {
  id: number;
  name: string;
  avatar: string | null;
}

type Page = {
  /** The page slug ID used for the unique URL */
  slug: string;
  title: string;
  content: string;
}

type Post = {
  /** The post slug ID used for the unique URL */
  slug: string;
  status: PostStatus;
  author: Author; // TODO
  title: string;
  /** The post HTML */
  content: string;
  /** Image UUID */
  cover: string;
  category: PostCategory;
  tags: string[];
  user_created: string;
  user_updated: string | null;
  date_created: string;
  date_updated: string | null;
}

type PostStatus = 'draft' | 'published' | 'archived';
type PostCategory = 'News' | 'Going Out' | 'Gastro' | 'Getting Around' | 'Guides';

type Schema = {
  authors: Author[];
  posts: Post[];
  global: Global;
  pages: Page[];
}

const directus = createDirectus<Schema>('https://content.pocketbarcelona.com/').with(rest());

export default directus;
