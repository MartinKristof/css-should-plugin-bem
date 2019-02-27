import { Media, Rule, Stylesheet } from 'css';
import { XshouldDeclarationInterface } from './RulesResolver';
import BemParser from './BemParser';

export type ClassNameType = string;
type ClassNamesType = Array<ClassNameType>;
export type SelectorType = string;
type SelectorsType = Array<SelectorType>;
export type LintRuleType = { missingClassName: ClassNameType; selector: SelectorType };

export const lint = (css: Stylesheet): { rules: Array<LintRuleType>; isValid: boolean; isBemDetected: boolean } => {
  const { rules, isBemDetected } = getInvalidRules(css);

  return {
    rules: rules.map(({ rule, className }) => ({
      missingClassName: className,
      selector: rule.selectors[0] || '',
    })),
    isValid: isBemDetected && rules.length === 0,
    isBemDetected,
  };
};

const getInvalidRules = (
  css: Stylesheet,
): { rules: Array<{ className: ClassNameType; rule: Rule }>; isBemDetected: boolean } => {
  let invalidRules = [];
  let invalidClassNames = [];
  let selectors = [];
  let bemSelectors = [];

  css.stylesheet.rules.forEach((rule: Rule & Media) => {
    detectMissingClasses(rule, invalidRules, invalidClassNames, selectors, bemSelectors);

    if (rule.type === 'media') {
      rule.rules.forEach((rule: Rule) => {
        detectMissingClasses(rule, invalidRules, invalidClassNames, selectors, bemSelectors);
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
  invalidRules: Array<Object>,
  invalidClassNames: ClassNamesType,
  selectors: SelectorsType,
  bemSelectors: SelectorsType,
) => {
  if (rule.type === 'rule') {
    const selector = rule.selectors[0];

    const allSelectors: Array<string> = [
      ...new Set(
        []
          .concat(...selector.split('.'))
          .filter((className) => className)
          .map((className) => `.${className}`),
      ),
    ];
    selectors.push(...allSelectors);

    rule.declarations.forEach((declaration: XshouldDeclarationInterface) => {
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
