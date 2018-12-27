import BemParser from './BemParser';
import { MediaQueryInterface } from './MediaQueryInterface';
import { AtRule, Comment, Rule } from 'css';

export interface XshouldDeclarationInterface {
  type: string;
  property: string;
  value: string;
}

export default class RulesResolver {
  constructor(private rules: Array<Rule | Comment | AtRule>) {}

  public resolve(): Array<Rule | MediaQueryInterface> {
    let result: Array<Rule | MediaQueryInterface> = [];

    this.rules.forEach(
      (rule: any): void => {
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
      },
    );

    return result;
  }

  private flattenRules(rules: Array<Rule>): Array<Rule> {
    let results: Array<Rule> = [];

    if (!rules) {
      return results;
    }

    rules.forEach(
      (rule): void => {
        if (!rule.selectors) {
          return;
        }

        rule.selectors.forEach(
          (selector): void => {
            const newRule: Rule = {
              type: rule.type,
              selectors: [selector],
              declarations: rule.declarations,
              position: rule.position,
            };

            results.push(newRule);
          },
        );
      },
    );

    return results;
  }

  private static isNotMediaQuery(rule: MediaQueryInterface | Rule): boolean {
    return rule.type != 'media';
  }

  private static isRule(rule: MediaQueryInterface | Rule): boolean {
    return rule.type == 'rule';
  }

  private getRuleWithBemDeclarations(rule: Rule): Rule {
    const selectorsWithCssClass: Array<string> = [];

    rule.selectors.forEach(
      (selector): void => {
        if (RulesResolver.isCssClass(selector)) {
          selector = RulesResolver.getLastPartOfCssClass(selector);
          selectorsWithCssClass.push(selector);
        }
      },
    );

    if (selectorsWithCssClass.length < 1) {
      return rule;
    }

    const params: Array<string> = BemParser.parse(selectorsWithCssClass[0]);

    if (!params) {
      return rule;
    }

    rule.declarations = rule.declarations.concat(
      params.map(
        (param): XshouldDeclarationInterface => {
          return { type: 'declaration', property: 'x-should', value: `match '${param}'` };
        },
      ),
    );

    return rule;
  }

  private static isCssClass(selector: string): RegExpMatchArray {
    const pattern: RegExp = /(\.\S+)/g;

    return selector.match(pattern);
  }

  private static getLastPartOfCssClass(selector: string): string {
    const parts: Array<string> = selector.split('.').filter(Boolean);

    return '.' + parts.pop();
  }
}
