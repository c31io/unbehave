import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			manifest: {
				name: 'unbehave - To not is to do',
				short_name: 'unbehave',
				description: 'A local-first PWA for behavioral intervention through regret-based decision making',
				theme_color: '#000000',
				background_color: '#000000',
				display: 'standalone',
				start_url: '/',
				icons: [
					{
						src: '/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png'
					},
					{
						src: '/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png'
					},
					{
						src: '/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: '/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png'
					},
					{
						src: '/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png'
					},
					{
						src: '/icon-180x180.png',
						sizes: '180x180',
						type: 'image/png'
					},
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable'
					},
					{
						src: '/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: '/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}']
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
