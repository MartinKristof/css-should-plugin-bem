import * as path from 'path';
import * as chalk from 'chalk';
import parseCss from './parseCss';
import { lint, ILintRule } from '../../src/lint';

export default function(fileName: string) {
  console.log('Linting file ' + path.join(__dirname, fileName));
  const { css } = parseCss(fileName);
  const rules: Array<ILintRule> = lint(css).rules;
  const missingClasses = rules.map(({ missingClassName }) => missingClassName);

  if (missingClasses.length) {
    console.log(chalk['red']('There are some bad class names according to BEM detected!'));
    console.log('You have to specify this classes: ' + chalk['red'](missingClasses.join(', ')));
  } else {
    console.log(chalk['green']('No errors detected!'));
  }
}
