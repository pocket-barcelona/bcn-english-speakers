import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.pocketbarcelona.com',
  integrations: [mdx(), sitemap(), tailwind()],
  output: "server",
  adapter: cloudflare(),
  image: {
    service: passthroughImageService()
  }
});