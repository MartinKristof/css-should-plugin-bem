import { AtRule, Comment, Rule } from 'css';
import BemParser from './BemParser';
import { IMediaQuery } from './IMediaQuery';
import { SelectorType } from './lint';

export interface IXShouldDeclaration {
  type: string;
  property: string;
  value: string;
}

export default class RulesResolver {
  private static isNotMediaQuery(rule: IMediaQuery | Rule): boolean {
    return rule.type !== 'media';
  }

  private static isRule(rule: IMediaQuery | Rule): boolean {
    return rule.type === 'rule';
  }

  private static isCssClass(selector: SelectorType): boolean {
    const pattern: RegExp = /(\.\S+)/g;

    return !!selector.match(pattern);
  }

  private static removeInvalidMatches(matches: string[]): string[] {
    return matches.filter((match) => !match.match(/\[.+/g));
  }

  private static getLastPartOfCssClass(selector: SelectorType): string {
    const parts: string[] = selector.split('.').filter(Boolean);

    return '.' + parts.pop();
  }
  constructor(private rules: Array<Rule | Comment | AtRule>) {}

  public resolve(): Array<Rule | IMediaQuery> {
    const result: Array<Rule | IMediaQuery> = [];

    this.rules.forEach(
      (rule: any): void => {
        if (RulesResolver.isNotMediaQuery(rule) && RulesResolver.isRule(rule)) {
          const rules = this.flattenRules([rule]);

          rules.map((item: any) => result.push(this.getRuleWithBemDeclarations(item)));

          return;
        }

        rule.rules = this.flattenRules(rule.rules);

        rule.rules = rule.rules.map((item: any) => this.getRuleWithBemDeclarations(item));

        result.push(rule);
      },
    );

    return result;
  }

  private flattenRules(rules: Rule[]): Rule[] {
    const results: Rule[] = [];

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
              declarations: rule.declarations,
              position: rule.position,
              selectors: [selector],
              type: rule.type,
            };

            results.push(newRule);
          },
        );
      },
    );

    return results;
  }

  private getRuleWithBemDeclarations(rule: Rule): Rule {
    const selectorsWithCssClass: string[] = [];

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

    let params: string[] = BemParser.parse(selectorsWithCssClass[0]);

    params = RulesResolver.removeInvalidMatches(params);

    if (!params) {
      return rule;
    }

    rule.declarations = rule.declarations.concat(
      params.map(
        (param): IXShouldDeclaration => ({ type: 'declaration', property: 'x-should', value: `match '${param}'` }),
      ),
    );

    return rule;
  }
}
