import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel/serverless';

import dotenv from 'dotenv';
dotenv.config();

// https://astro.build/config
export default defineConfig({
    site: process.env.PUBLIC_BASE_URL,
    integrations: [tailwind(), solidJs(), sitemap({ customPages: [`${process.env.PUBLIC_BASE_URL}`] })],
    output: 'server',
    adapter: vercel(),
});
