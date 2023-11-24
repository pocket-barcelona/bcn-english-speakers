import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
// import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pocketbarcelona.com',
  integrations: [mdx(), sitemap(), tailwind()],
  output: "static", // https://docs.astro.build/en/guides/server-side-rendering/
  // adapter: node({
  //   mode: "standalone"
  // }),
});