import {Media, Rule, Stylesheet} from "css";
import {XshouldDeclarationInterface} from "./RulesResolver";

export function lint(css: Stylesheet): Array<string> {
    let selectors: Array<string> = [];
    let foundClasses: Array<string> = [];

    css.stylesheet.rules.forEach((rule: Rule & Media) => {
        detectMissingClasses(rule, selectors, foundClasses);

        if (rule.type === 'media') {
            rule.rules.forEach((rule: Rule) => {
                detectMissingClasses(rule, selectors, foundClasses);
            });
        }
    });

    return foundClasses.filter((i: string) => {
        return selectors.indexOf(i) < 0;
    });
}

function detectMissingClasses(rule: Rule, selectors: Array<Object>, foundClasses: Array<string>) {
    if (rule.type === 'rule') {
        selectors.push(rule.selectors[0]);
        rule.declarations.forEach((declaration: XshouldDeclarationInterface) => {
            if (declaration.property === 'x-should') {
                let ruleDeclaration: RegExpMatchArray = declaration.value.match(/(?=\.)(.*)(?=')/g);
                let className: RegExpMatchArray = ruleDeclaration[0].match(/(\.\w+)/g);

                if (className[0]) {
                    if (selectors.indexOf(className[0])) {
                        foundClasses.indexOf(className[0]) === -1 && foundClasses.push(className[0]);
                    }
                }
            }
        });
    }
}