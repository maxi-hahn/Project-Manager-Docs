import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://project-manager-docs.vercel.app", // tu URL real
  integrations: [tailwind(), sitemap()],
});