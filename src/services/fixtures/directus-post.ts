import type { HeadlessPost } from "../../lib/directus";

const directusPostPublished: HeadlessPost = {
  slug: "test-post",
  status: "published",
  author: {
    id: 1,
    name: "Darryl",
    avatar: "abc-123-uuid"
  },
  title: "Test",
  content: "<p>Test</p>",
  snippet: "Test",
  cover: {
    id: "abc-123-uuid",
    type: "image/jpeg",
    width: 400,
    height: 300,
    title: "my image"
  },
  category: "Guides",
  tags: ["tag-1", "tag-2"],
  user_created: "test",
  user_updated: "test",
  date_created: "2025-01-28T15:51:31.645Z",
  date_updated: "2025-01-31T13:36:23.951Z",
  published_date: "2025-01-28T15:51:31",
};
