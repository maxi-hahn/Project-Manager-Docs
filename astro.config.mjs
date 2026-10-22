import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://project-manager-docs.vercel.app", 
  integrations: [
    tailwind(), 
    sitemap({
      filter: (page) => !page.includes('/404'), // Evita que el 404 rompa el sitemap
    })
  ],
});