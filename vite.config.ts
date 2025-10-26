import {UserConfig} from 'vite';
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';

// https://vitejs.dev/config/
export default {
	plugins: [react()],
	build: {
		target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
	},
	define: { // Typed in vite-env.d.ts
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
	base: '/',
	server: {
		open: true,
		port: 3000,
		host: true, //Disable host check during development
	},
} satisfies UserConfig;
