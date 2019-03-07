import { parse, stringify, Stylesheet } from 'css';
import * as fs from 'fs';
import * as path from 'path';
import { preprocess } from '../../src';

export const ENCODING: string = 'utf8';

export default function parseCss(fileName: string) {
  const cssFile: string = fs.readFileSync(path.join(__dirname, fileName), ENCODING);
  const css: Stylesheet = parse(cssFile);

  preprocess(css, () => 'css');

  const newCssFile: string = stringify(css);

  return { newCssFile, cssFile, css };
}
