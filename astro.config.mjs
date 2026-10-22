import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://project-manager-docs.vercel.app", 
  integrations: [tailwind()],
});