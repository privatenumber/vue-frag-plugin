const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

/** @type {import('webpack').Configuration} */
const config = {
	entry: {
		index: './src/index.js',
	},

	output: {
		path: path.resolve('www/dist'),
		clean: true,
	},

	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
		],
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					'vue-loader',
					'vue-frag-plugin/loader',
				],
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
	],
};

module.exports = config;
