/* eslint-disable unicorn/template-indent */
import outdent from 'outdent';
import transformer from '../src/transformer';
import {
	singleRootComponent,
	multiRootComponent,
	multiRootComponentWithEmptyScript,
	multiRootComponentWithScript,
	multiRootComponentWithTemplate,
} from './fixtures';

test('ignore single root', () => {
	const transformed = transformer(singleRootComponent);

	expect(transformed.code).toBe(outdent`
		<template>
			<div>
				hello world
			</div>
		</template>

	`);
});

test('wraps multi root', () => {
	const transformed = transformer(multiRootComponent);

	expect(transformed.code).toBe(outdent`
		<template>
			<div v-frag><div>
				hello
			</div>
			<div>
				fragments
			</div></div>
		</template><script>import "vue-frag-plugin/install-vue-frag";export default {};</script>

	`);
});

test('wraps multi root with empty script', () => {
	const transformed = transformer(multiRootComponentWithEmptyScript);

	expect(transformed.code).toBe(outdent`
		<template>
			<div v-frag><div>
				hello
			</div>
			<div>
				fragments
			</div></div>
		</template>

		<script>import "vue-frag-plugin/install-vue-frag";</script>

	`);
});

test('wraps multi root with script', () => {
	const transformed = transformer(multiRootComponentWithScript);

	expect(transformed.code).toBe(outdent`
		<template>
			<div v-frag><div>
				hello
			</div>
			<div>
				fragments
			</div></div>
		</template>

		<script>import "vue-frag-plugin/install-vue-frag";
		export default {};
		</script>

	`);
});

test('wraps multi root with script', () => {
	const transformed = transformer(multiRootComponentWithTemplate);

	expect(transformed.code).toBe(outdent`
		<template>
			<div v-frag><template>
				<div>
					hello
				</div>
				<div>
					fragments
				</div>
			</template></div>
		</template><script>import "vue-frag-plugin/install-vue-frag";export default {};</script>

	`);
});

/* eslint-enable unicorn/template-indent */
