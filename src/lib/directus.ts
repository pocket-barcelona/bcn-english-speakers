import { createDirectus, rest, graphql } from '@directus/sdk';
import { HEADLESS_STUB } from '../consts';

export type HeadlessGlobal = {
  id: number;
  title: string;
  description: string;
}

export type HeadlessAuthor = {
  id: number;
  /** Formatted, like: Bob */
  name: string;
  /** File UUID */
  avatar: string | null;
}

export type HeadlessPage = {
  /** The page slug ID used for the unique URL */
  slug: string;
  title: string;
  content: string;
}

export type HeadlessPost = {
  /** The post slug ID used for the unique URL */
  slug: string;
  status: PostStatus;
  author: HeadlessAuthor; // TODO
  title: string;
  /** The post HTML */
  content: string;
  snippet: string;
  /** Image UUID */
  cover: string;
  category: PostCategory;
  tags: string[];
  published_date: string;
  user_created: string;
  user_updated: string | null;
  date_created: string;
  date_updated: string | null;
}

type PostStatus = 'draft' | 'published' | 'archived';
type PostCategory = 'News' | 'Going Out' | 'Gastro' | 'Getting Around' | 'Guides';

type HeadlessSchema = {
  authors: HeadlessAuthor[];
  posts: HeadlessPost[];
  global: HeadlessGlobal;
  pages: HeadlessPage[];
}


const directus = createDirectus<HeadlessSchema>(`${HEADLESS_STUB}/`).with(rest());

export default directus;