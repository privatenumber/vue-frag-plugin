import { parse } from '@vue/compiler-dom';
import type { ElementNode } from '@vue/compiler-dom';
import MagicString, { SourceMap } from 'magic-string';
import { isElement } from 'vue-ast-utils';

type Transform = {
	code: string;
	map?: SourceMap;
};

const importStatement = 'import "vue-frag-plugin/install-vue-frag";';

function wrapVueFrag(
	magicString: MagicString,
	template: ElementNode,
) {
	const firstChild = template.children[0];
	const lastChild = template.children[template.children.length - 1];

	magicString.appendRight(firstChild.loc.start.offset, '<div v-frag>');
	magicString.appendRight(lastChild.loc.end.offset, '</div>');
}

function injectVueFragImport(
	magicString: MagicString,
	template: ElementNode,
	script?: ElementNode,
) {
	if (!script) {
		magicString.appendRight(template.loc.end.offset, `<script>${importStatement}export default {};</script>`);
		return;
	}

	const hasChild = script.children[0];
	if (hasChild) {
		magicString.appendLeft(hasChild.loc.start.offset, importStatement);
	} else {
		const { source } = script.loc;
		const position = source.indexOf('</script>') + 1;
		magicString.prependRight(script.loc.end.offset - position, importStatement);
	}
}

export default function transform(
	code: string,
	filename?: string,
): Transform {
	const result: Transform = { code };

	// Test invalid sfc
	const parsed = parse(code);
	const template = parsed.children.filter(isElement).find(child => child.tag === 'template');

	if (!template || template.children.length === 0) {
		return result;
	}

	const [rootElement] = template.children;
	const isRootTemplate = (
		isElement(rootElement)
		&& rootElement.tag === 'template'
	);

	if (isRootTemplate || template.children.length > 1) {
		const magicString = new MagicString(code);

		wrapVueFrag(magicString, template);

		const script = parsed.children.filter(isElement).find(child => child.tag === 'script');
		injectVueFragImport(magicString, template, script);

		result.map = magicString.generateMap({
			source: filename,
			file: `${filename}.map`,
		});

		result.code = magicString.toString();
	}

	return result;
}
