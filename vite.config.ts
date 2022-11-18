import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
		host: true, //Disable host check during development
	},
});
