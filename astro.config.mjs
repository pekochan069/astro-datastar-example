// @ts-check
import { defineConfig } from "astro/config";
import datastar from "@pekochan069/astro-datastar";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [datastar()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
