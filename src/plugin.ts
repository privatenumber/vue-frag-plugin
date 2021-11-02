import { createFilter } from '@rollup/pluginutils';
import { Plugin } from 'rollup';
import transformer from './transformer';

type Options = {
	include?: string;
	exclude?: string;
};

export default function vueFrag(options: Options = {}): Plugin {
	const filter = createFilter(
		options.include ?? '**/*.vue',
		options.exclude,
	);

	return {
		name: 'vue-frag',

		transform(source, id) {
			if (!filter(id)) {
				return;
			}

			return transformer(source, id);
		},
	};
}
