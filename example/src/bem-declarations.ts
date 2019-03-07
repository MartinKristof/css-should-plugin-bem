/* tslint:disable:no-console */
import * as chalk from 'chalk';
import { diffLines } from 'diff';
import * as fs from 'fs';
import * as path from 'path';
import IDiffResult = JsDiff.IDiffResult;
import { default as parseCss, ENCODING } from './parseCss';

export default function getBemDeclarations(fileName: string) {
  console.log('Adding BEM declarations for file ' + path.join(__dirname, fileName));
  const { newCssFile, cssFile } = parseCss(fileName);

  const diff: IDiffResult[] = diffLines(cssFile, newCssFile);

  diff.forEach((part: IDiffResult) => {
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';

    process.stderr.write(chalk[color](part.value));
  });

  console.log();

  const newFilePath: string = path.join(__dirname, '../output/example-out.css');

  console.log('css-should declarations will be written into file ' + newFilePath);
  fs.writeFileSync(newFilePath, newCssFile, ENCODING);
}
