import { vueFrag } from '..';
import { build } from './utils/rollup';
import { multiRootComponentPath } from './fixtures';

test('works with vue rollup plugin', async () => {
	const output = await build(multiRootComponentPath, (config) => {
		config.plugins.unshift(vueFrag());
	});

	const Component = eval(output); // eslint-disable-line no-eval
	expect(Component).toMatchObject({ _compiled: true });
});
