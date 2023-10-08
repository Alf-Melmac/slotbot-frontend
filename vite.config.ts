import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	plugins: [react()],
	build: {
		target: browserslistToEsbuild([">0.2%", "not dead", "not op_mini all"]),
	},
	base: '/',
	server: {
		open: true,
		port: 3000,
		host: true, //Disable host check during development
	},
});
