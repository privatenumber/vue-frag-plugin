import path from 'path';
import type { Configuration } from 'webpack';

const vueFragInstall = path.resolve(__dirname, '../../dist/install-vue-frag.js');
const vueFragPluginLoader = path.resolve(__dirname, '../../dist/loader.js');

export function setupVueFragPlugin(config: Configuration) {
	config.resolve = {
		alias: {
			'vue-frag-plugin/install-vue-frag': vueFragInstall,
		},
	};
	config.resolveLoader = {
		alias: {
			'vue-frag-plugin/loader': vueFragPluginLoader,
		},
	};
}
