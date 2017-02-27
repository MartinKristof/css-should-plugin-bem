import * as fs from 'fs';
import * as path from 'path';
import {parse, stringify, Stylesheet} from 'css';
import {diffLines} from 'diff';
import * as chalk from 'chalk';
import IDiffResult = JsDiff.IDiffResult;

import {preprocess} from '../src';

const ENCODING : string = 'utf8';
const cssFile : string = fs.readFileSync(path.join(__dirname, './example.css'), ENCODING);
const css : Stylesheet = parse(cssFile);

preprocess(css, () => {});

const newCssFile : string = stringify(css);
const diff : Array<IDiffResult> = diffLines(cssFile, newCssFile);

diff.forEach((part : IDiffResult) => {
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';

    process.stderr.write(chalk[color](part.value));
});

console.log();

const newFilePath : string = path.join(__dirname, './example-out.css');

console.log('Write the new file in ' + newFilePath);
//fs.writeFileSync(newFilePath, newCssFile, ENCODING);
