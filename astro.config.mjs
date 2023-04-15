import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';

dotenv.config();

export default defineConfig({
    site: process.env.PUBLIC_BASE_URL,
    integrations: [tailwind(), solidJs(), sitemap()],
});
