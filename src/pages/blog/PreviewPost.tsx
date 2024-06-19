import { useEffect, useState } from "preact/hooks";
import { HEADLESS_STUB } from "../../consts";
import type { HeadlessPost } from "../../lib/directus";

export default function PreviewPost() {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchPost(slug: string): Promise<HeadlessPost | null> {
      // @note - requires CORS chrome extension to test locally with CORS!
      const res = await fetch(`${HEADLESS_STUB}/items/posts/${slug}`);
      const data = await res.json();
      return data?.data ? data.data : null;
    }

    // get query string parameter called id
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (!id) return;

    // fetch post from directus based on URL and populate into page
    try {
      fetchPost(id).then((post) => {
        console.debug({ post });
        if (!post) {
          setContent("<p>Post not found.</p>");
        } else if (post.status.toLowerCase() !== "draft") {
          setContent("<p>Post is not a draft post.</p>");
        } else {
          setContent(
            post?.content ?? "<p>Loaded but post content not found.</p>"
          );
        }
      });
    } catch (error) {
      console.debug({ error });
      if (error instanceof Error) {
        setContent(`<p>Error: ${error.message}</p>`);
      }
      setContent("<p>Error: No content found</p>");
    }
  }, []);

  return (
    <>
      {!content && <p class="text-center text-lg">Loading post...</p>}
      {content && (
        <h1 class="my-4 text-red-600 p-2 bg-yellow-100 text-center font-bold text-3xl">
          This is a preview!
        </h1>
      )}
      <PostBody content={content} />
    </>
  );
}

type PostBodyProps = {
  content: string;
};
/** @todo - keep these prose styles in-line with post-body.astro */
function PostBody({ content }: PostBodyProps) {
  return (
    <div
      class="
        mx-auto mt-8 lg:mt-16 max-w-3xl
        prose prose-md lg:prose-lg
        prose-li:my-1 prose-ul:my-4
        prose-p:leading-6 sm:prose-p:leading-7
        prose-hr:my-6 sm:prose-hr:my-12 prose-hr:border-gray-300
      "
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
