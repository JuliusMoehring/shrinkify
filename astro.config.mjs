import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';

const { PUBLIC_BASE_URL } = loadEnv(import.meta.env.MODE, process.cwd(), '');

export default defineConfig({
    site: PUBLIC_BASE_URL,
    integrations: [tailwind(), solidJs(), sitemap()],
});
