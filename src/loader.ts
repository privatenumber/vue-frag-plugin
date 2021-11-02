import { LoaderContext } from 'webpack';
import transformer from './transformer';

function VueFragLoader(this: LoaderContext<never>, source: string) {
	const { code, map } = transformer(source, this.resourcePath);
	this.callback(null, code, map);
}

export default VueFragLoader;
