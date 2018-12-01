import * as fs from 'fs';
import * as path from 'path';
import {parse, stringify, Stylesheet} from 'css';
import {preprocess} from '../../src/index';

export const ENCODING: string = 'utf8';

export default function parseCss(fileName: string) {
    const cssFile: string = fs.readFileSync(path.join(__dirname, fileName), ENCODING);
    const css: Stylesheet = parse(cssFile);

    preprocess(css, () => {
    });

    const newCssFile: string = stringify(css);

    return {newCssFile, cssFile, css};
}
