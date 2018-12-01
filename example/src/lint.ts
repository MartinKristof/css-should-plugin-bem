import * as path from 'path';
import * as chalk from 'chalk';
import parseCss from './parseCss';
import {lint} from "../../src/lint";

export default function (fileName: string) {
    console.log('Linting file ' + path.join(__dirname, fileName));
    const {css} = parseCss(fileName);
    const missingClasses = lint(css);

    if (missingClasses.length) {
        console.log(chalk['red']('There are some bad class names according to BEM detected!'));
        console.log('You have to specify this classes: ' + chalk['red'](missingClasses.join(', ')));
    } else {
        console.log(chalk['green']('No errors detected!'));
    }
}
