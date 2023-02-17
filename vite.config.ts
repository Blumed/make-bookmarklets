import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite';

export default defineConfig(({command}: any) => {
	if (command === 'serve') {
		return {
			server: {       
				host: "0.0.0.0",
				port: 3111,
				proxy: {},
				https: {
					key: fs.readFileSync('./.cert/key.pem'),
					cert: fs.readFileSync('./.cert/cert.pem'),
				},
			},
			plugins: [
				sveltekit(),
			],	test: {
				include: ['src/**/*.{test,spec}.{js,ts}']
			}
		}
	} else {
		return {
			plugins: [
				sveltekit(),
			],
			test: {
				include: ['src/**/*.{test,spec}.{js,ts}']
			}
		}
	}
}) as UserConfig;