import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from 'astro';

/**
 * @url http://localhost:4321/og-image.png
 * @returns A custom OG image
 */
export const GET: APIRoute = async function get({ params, request }) {
  const fontData = await fs.readFile("./public/fonts/Inter-Bold.ttf");

  const svg = await satori(
    {
      type: "h1",
      props: {
        children: "Hello world",
        style: {
          fontWeight: "bold"
        }
      }
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
}