import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import { vueFrag } from 'vue-frag-plugin';

const config = defineConfig({
	resolve: {
		alias: {
			'vue-frag': path.resolve(__dirname, 'node_modules/vue-frag'),
		},
	},
	plugins: [
		vueFrag(),
		createVuePlugin(),
	],
});

export default config;
