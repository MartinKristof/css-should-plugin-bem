import BemParser from './BemParser';
import {RuleInterface} from './RuleInterace';
import {MediaQueryInterface} from './MediaQueryInterface';

export default class RulesResolver {
    constructor(private rules : Array<RuleInterface|MediaQueryInterface>) {
    }

    public resolve() : Array<RuleInterface|MediaQueryInterface> {
        let result : Array<RuleInterface|MediaQueryInterface> = [];

        this.rules.forEach((rule : any) : void => {
            if (RulesResolver.isNotMediaQuery(rule) && RulesResolver.isRule(rule)) {
                let rules = this.flattenRules([rule]);

                rules.map((rule) => {
                    result.push(this.getRuleWithBemDeclarations(rule));
                });

                return;
            }

            rule.rules = this.flattenRules(rule.rules);

            rule.rules = rule.rules.map((rule) => {
                return this.getRuleWithBemDeclarations(rule);
            });

            result.push(rule);
        });

        return result;
    }

    private flattenRules(rules : Array<RuleInterface>) : Array<RuleInterface> {
        let results : Array<RuleInterface> = [];

        rules.forEach((rule) : void => {
            rule.selectors.forEach((selector) : void => {
                const newRule : RuleInterface = {
                    type: rule.type,
                    selectors: [selector],
                    declarations: rule.declarations,
                    position: rule.position
                };

                results.push(newRule);
            });
        });

        return results;
    }

    private static isNotMediaQuery(rule : MediaQueryInterface|RuleInterface) : boolean {
        return rule.type != 'media';
    }

    private static isRule(rule : MediaQueryInterface|RuleInterface) : boolean {
        return rule.type == 'rule';
    }

    private getRuleWithBemDeclarations(rule : RuleInterface) : RuleInterface {
        const selectorsWithCssClass : Array<string> = [];

        rule.selectors.forEach((selector) : void => {
            if (RulesResolver.isCssClass(selector)) {
                selector = RulesResolver.getLastPartOfCssClass(selector);
                selectorsWithCssClass.push(selector);
            }
        });

        if (selectorsWithCssClass.length < 1) {
            return rule;
        }

        const params : Array<string> = BemParser.parse(selectorsWithCssClass[0]);

        if (!params) {
            return rule;
        }

        rule.declarations = rule.declarations.concat(params.map((param) : Object => {
            return {type: 'declaration', axis: 'x-should', param: `match '${param}'`};
        }));

        return rule;
    }

    private static isCssClass(selector : string) : RegExpMatchArray {
        const pattern : RegExp = /(\.\S+)/g;

        return selector.match(pattern);
    }

    private static getLastPartOfCssClass(selector : string) : string {
        const parts = selector.split('.').filter(Boolean);

        return '.' + parts.pop();
    }
}
