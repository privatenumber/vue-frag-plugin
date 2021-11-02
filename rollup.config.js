import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import { dependencies } from './package.json';

export default [
	// Loader and Plugin
	defineConfig({
		input: {
			index: './src/index.ts',
			loader: './src/loader.ts',
			plugin: './src/plugin.ts',
		},

		plugins: [
			resolve(),
			commonjs(),
			esbuild({
				minify: true,
			}),
		],

		external: [
			...Object.keys(dependencies),
		],

		output: {
			dir: './dist',
			format: 'commonjs',
			exports: 'auto',
			interop: false,
		},
	}),

	// Types
	defineConfig({
		input: './src/index.ts',

		plugins: [
			dts(),
		],

		output: {
			dir: './dist',
		},
	}),

	// Vue frag auto installer
	defineConfig({
		input: './src/install-vue-frag.js',

		plugins: [
			resolve(),
			commonjs(),
			esbuild({
				minify: true,
			}),
		],

		external: ['vue', 'vue-frag'],

		output: {
			dir: './dist',
			format: 'esm',
		},
	}),
];
