import { build } from 'webpack-test-utils';
import { VueLoaderPlugin } from 'vue-loader';
import { setupVueFragPlugin } from './utils/webpack';
import { multiRootComponent } from './fixtures';

const FragmentComponent = {
	'/src/index.js': 'export { default } from "./component.vue"',
	'/src/component.vue': multiRootComponent,
};

test('vue-loader complains about fragments w/o vue-frag/loader', async () => {
	const built = await build(FragmentComponent, (config) => {
		setupVueFragPlugin(config);

		config.module.rules.push({
			test: /\.vue$/,
			loader: 'vue-loader',
		});

		// @ts-expect-error VueLoaderPlugin uses Webpack 4 types
		config.plugins.push(new VueLoaderPlugin());
	});

	expect(built.stats.hasWarnings()).toBe(false);
	expect(built.stats.hasErrors()).toBe(true);
});

test('works with vue-loader', async () => {
	const built = await build(FragmentComponent, (config) => {
		setupVueFragPlugin(config);

		config.module.rules.push({
			test: /\.vue$/,
			use: [
				'vue-loader',
				'vue-frag-plugin/loader',
			],
		});

		// @ts-expect-error VueLoaderPlugin uses Webpack 4 types
		config.plugins.push(new VueLoaderPlugin());
	});

	expect(built.stats.hasWarnings()).toBe(false);
	expect(built.stats.hasErrors()).toBe(false);
	expect(built.require('/dist')).toMatchObject({ _compiled: true });
});
