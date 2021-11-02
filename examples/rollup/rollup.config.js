import path from 'path';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import { vueFrag } from 'vue-frag-plugin';
import replace from 'rollup-plugin-replace';

export default defineConfig({
	input: './src/index.js',

	plugins: [
		resolve({
			moduleDirectories: [path.resolve(__dirname, 'node_modules')],
		}),
		vueFrag(),
		vue(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
	],

	output: {
		dir: './www/dist',
		format: 'commonjs',
		exports: 'auto',
		interop: false,
	},
});
