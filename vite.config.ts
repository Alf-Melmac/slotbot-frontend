import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	plugins: [react()],
	base: '/',
	server: {
		open: true,
		port: 3000,
		host: true, //Disable host check during development
	},
});
