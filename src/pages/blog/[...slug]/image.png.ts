import { getCollection, getEntryBySlug } from "astro:content";
import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}
// http://localhost:4321/blog/37-sitges-carnival-2024/image.png
export const GET: APIRoute = async function get({ params, request }) {
  const fontData = await fs.readFile("./public/fonts/Inter-Bold.ttf");
  const post = await getEntryBySlug("blog", params.slug as any);
  // const poster = post?.data.cover.src;
  const poster =
    "./src/assets/blog/37-sitges-carnival/sitges-carnival-parade.jpg";
  const myImageBase64 = (
    await fs.readFile(poster ?? "./public/og-image.jpg")
  ).toString("base64");

  // const svg = await satori(
  //   {
  //     type: "div",
  //     props: {
  //       style: {
  //         backgroundImage: `url('data:image/png;base64,${myImageBase64}')`,
  //         backgroundSize: "100px 100px",
  //         backgroundPosition: "center",
  //         backgroundColor: "transparent",
  //         display: 'flex'
  //       },
  //       children: {
  //         type: "h1",
  //         props: {
  //           children: "Hello world",
  //           style: {
  //             fontWeight: "bold",
  //           },
  //         },
  //       },
  //     },
  //   },
  //   {
  //     width: 1200,
  //     height: 630,
  //     fonts: [
  //       {
  //         name: "Inter",
  //         data: fontData,
  //         weight: 700,
  //         style: "normal",
  //       },
  //     ],
  //   }
  // );

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          // backgroundImage: `url('data:image/png;base64,${myImageBase64}')`,
          // backgroundColor: "transparent",
          backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR')`,

          backgroundSize: "100%",
          // backgroundPosition: "center",
          display: 'flex',
          width: '100%',
          height: '100%'
        },
        // src: `url('data:image/png;base64,${myImageBase64}')`,
        // width: 1200,
        // height: 630,
        children: {
          type: "h1",
          props: {
            children: "Hello world 3",
            style: {
              fontWeight: "bold",
            },
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
