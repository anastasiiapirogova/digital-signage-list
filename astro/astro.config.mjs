// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://astro.build/config
export default defineConfig({
  site: 'https://signagelist.org',
  vite: {
    plugins: [
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: '../data/logos/generated/*',
            dest: 'assets/logos'
          }
        ]
      })
    ],

  },
  integrations: [react()]
});