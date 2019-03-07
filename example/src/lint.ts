/* tslint:disable:no-console */
import * as chalk from 'chalk';
import * as path from 'path';
import { ILintRule, lint } from '../../src/lint';
import parseCss from './parseCss';

export default function(fileName: string) {
  console.log('Linting file ' + path.join(__dirname, fileName));
  const { css } = parseCss(fileName);
  const rules: ILintRule[] = lint(css).rules;
  const missingClasses = rules.map(({ missingClassName }) => missingClassName);

  if (missingClasses.length) {
    console.log(chalk.red('There are some bad class names according to BEM detected!'));
    console.log('You have to specify this classes: ' + chalk.red(missingClasses.join(', ')));
  } else {
    console.log(chalk.green('No errors detected!'));
  }
}
