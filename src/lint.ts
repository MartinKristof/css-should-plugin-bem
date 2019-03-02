import { Media, Rule, Stylesheet } from 'css';
import BemParser from './BemParser';
import { IXShouldDeclaration } from './RulesResolver';

export type ClassNameType = string;
type ClassNamesType = ClassNameType[];
export type SelectorType = string;
type SelectorsType = SelectorType[];
export interface ILintRule {
  missingClassName: ClassNameType;
  selector: SelectorType;
}

export const lint = (css: Stylesheet): { rules: ILintRule[]; isValid: boolean; isBemDetected: boolean } => {
  const { rules, isBemDetected } = getInvalidRules(css);

  return {
    isBemDetected,
    isValid: isBemDetected && rules.length === 0,
    rules: rules.map(({ rule, className }) => ({
      missingClassName: className,
      selector: rule.selectors[0] || '',
    })),
  };
};

const getInvalidRules = (
  css: Stylesheet,
): { rules: Array<{ className: ClassNameType; rule: Rule }>; isBemDetected: boolean } => {
  const invalidRules = [];
  const invalidClassNames = [];
  const selectors = [];
  const bemSelectors = [];

  css.stylesheet.rules.forEach((rule: Rule & Media) => {
    detectMissingClasses(rule, invalidRules, invalidClassNames, selectors, bemSelectors);

    if (rule.type === 'media') {
      rule.rules.forEach((item: Rule) => {
        detectMissingClasses(item, invalidRules, invalidClassNames, selectors, bemSelectors);
      });
    }
  });

  return { rules: [...new Set(invalidRules)], isBemDetected: bemSelectors.length > 0 };
};

const isClassNameExistInCollection = (
  invalidClassNames: ClassNamesType,
  selectors: SelectorsType,
  className: ClassNameType,
): boolean => selectors.includes(className);

const detectMissingClasses = (
  rule: Rule,
  invalidRules: object[],
  invalidClassNames: ClassNamesType,
  selectors: SelectorsType,
  bemSelectors: SelectorsType,
) => {
  if (rule.type === 'rule') {
    const selector = rule.selectors[0];

    const allSelectors: string[] = [
      ...new Set(
        []
          .concat(...selector.split('.'))
          .filter((className) => className)
          .map((className) => `.${className}`),
      ),
    ];
    selectors.push(...allSelectors);

    rule.declarations.forEach((declaration: IXShouldDeclaration) => {
      if (declaration.property === 'x-should') {
        bemSelectors.push(selector);
        const ruleDeclaration: RegExpMatchArray = declaration.value.match(/(?=\.)(.*)(?=')/g);
        const classNamesDeclaration: RegExpMatchArray = ruleDeclaration[0].match(/(\.\S+)/g);

        const className = classNamesDeclaration[0];

        if (isClassNameExistInCollection(invalidClassNames, selectors, className)) {
          return;
        }

        if (BemParser.isBemModifier(selector) && BemParser.isBemBlock(className)) {
          const regex = new RegExp(className, 'g');
          const matched = selector.match(regex);

          if (matched.length <= 1) {
            invalidClassNames.push(className);
            invalidRules.push({ className, rule });

            return;
          }
        }

        if (BemParser.isBemBlock(selector) && !BemParser.isBemModifier(className) && !BemParser.isBemBlock(className)) {
          invalidClassNames.push(className);
          invalidRules.push({ className, rule });

          return;
        }

        if (BemParser.isBemModifier(selector)) {
          invalidClassNames.push(className);
          invalidRules.push({ className, rule });

          return;
        }
      }
    });
  }
};
