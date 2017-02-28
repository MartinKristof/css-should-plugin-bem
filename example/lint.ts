import * as path from 'path';
import {Rule, Media} from 'css';
import * as chalk from 'chalk';
import IDiffResult = JsDiff.IDiffResult;
import {XshouldDeclarationInterface} from '../src/RulesResolver';
import parseCss from './parseCss';

export default function lint(fileName : string) {
    console.log('Linting file ' + path.join(__dirname, fileName));
    const {css} = parseCss(fileName);

    let selectors : Array<string> = [];
    let foundClasses : Array<string> = [];

    css.stylesheet.rules.forEach((rule : Rule) => {
        detectMissingClasses(rule, selectors, foundClasses);

        if (rule.type === 'media') {
            const mediaRules : Media = rule;

            mediaRules.rules.forEach((rule) => {
                detectMissingClasses(rule, selectors, foundClasses);
            });
        }
    });

    const missingClasses : Array<string> = foundClasses.filter((i) => {
        return selectors.indexOf(i) < 0;
    });

    if (missingClasses.length) {
        console.log(chalk['red']('There are some bad class names according to BEM detected!'));
        console.log('You have to specify this classes: ' + chalk['red'](missingClasses.join(', ')));
    } else {
        console.log(chalk['green']('No errors detected!'));
    }
}

function detectMissingClasses(rule : Rule, selectors: Array<Object>, foundClasses: Array<string>) {
    if (rule.type === 'rule') {
        selectors.push(rule.selectors[0]);
        rule.declarations.forEach((declaration : XshouldDeclarationInterface) => {
            if (declaration.property === 'x-should') {
                let ruleDeclaration : RegExpMatchArray = declaration.value.match(/(?=\.)(.*)(?=')/g);
                let className : RegExpMatchArray = ruleDeclaration[0].match(/(\.\w+)/g);

                if (className[0]) {
                    if (selectors.indexOf(className[0])) {
                        foundClasses.indexOf(className[0]) === -1 && foundClasses.push(className[0]);
                    }
                }
            }
        });
    }
}
