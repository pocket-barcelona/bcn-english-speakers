import type { CollectionEntry } from "astro:content";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const render = () => null as unknown as any;

const post1: CollectionEntry<"blog"> = {
  id: "0001",
  slug: "my-first-post",
  data: {
    title: "First post",
    snippet: "This is my first post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2025-01-01"),
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: false,
  },
  body: "",
  collection: "blog",
  render,
};

const post2: CollectionEntry<"blog"> = {
  id: "0002",
  slug: "my-second-post",
  data: {
    title: "Second post",
    snippet: "This is my second post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2025-01-04"),
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: false,
  },
  body: "",
  collection: "blog",
  render,
};

const post3: CollectionEntry<"blog"> = {
  id: "0003",
  slug: "my-third-post",
  data: {
    title: "Third post",
    snippet: "This is my third post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2025-01-07"),
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: false,
  },
  body: "",
  collection: "blog",
  render,
};

const post4Updated: CollectionEntry<"blog"> = {
  id: "0004",
  slug: "my-fourth-post",
  data: {
    title: "Fourth post",
    snippet: "This is my fourth post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2024-12-01"), // older than other posts
    updatedDate: new Date("2025-01-10"), // has updated date
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: false,
  },
  body: "",
  collection: "blog",
  render,
};

const post5Draft: CollectionEntry<"blog"> = {
  id: "0005",
  slug: "my-fifth-post",
  data: {
    title: "Fifth post",
    snippet: "This is my fifth post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2025-01-13"),
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: true,
  },
  body: "",
  collection: "blog",
  render,
};

const post6DraftPost: CollectionEntry<"blog"> = {
  id: "0006",
  slug: "my-draft-post",
  data: {
    title: "Draft post",
    snippet: "This is my draft post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2025-01-12"),
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: true,

  },
  body: "",
  collection: "blog",
  render,
};

const post7HiddenPost: CollectionEntry<"blog"> = {
  id: "0007",
  slug: "my-hidden-post",
  data: {
    title: "Hidden post",
    snippet: "This is my hidden post",
    author: "Darryl",
    authorId: "darryl",
    tags: ["tag-1"],
    publishDate: new Date("2024-11-01"),
    category: "Guides",
    cover: {
      src: "cover.jpg",
      format: "jpg",
      width: 400,
      height: 300,
    },
    coverAlt: "Cover alt",
    draft: false,
    hidePost: true,
  },
  body: "",
  collection: "blog",
  render,
};

export {
  post1 as TESTPOST1,
  post2 as TESTPOST2,
  post3 as TESTPOST3,
  post4Updated as TESTPOST4,
  post5Draft as TESTPOST5,
  post6DraftPost as TESTPOST6,
  post7HiddenPost as TESTPOST7,
};
