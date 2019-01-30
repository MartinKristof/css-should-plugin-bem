import { Media, Rule, Stylesheet } from 'css';
import { XshouldDeclarationInterface } from './RulesResolver';
import BemParser from './BemParser';

export type ClassNameType = string;
type ClassNamesType = Array<ClassNameType>;
export type SelectorType = string;
type SelectorsType = Array<SelectorType>;

export const lint = (css: Stylesheet): Array<Object> => {
  const rules = getInvalidRules(css);

  return rules.map(({ rule, className }) => ({
    missingClassName: className,
    selector: rule.selectors[0] || '',
    source: rule.position.source,
    start: rule.position.start,
    end: rule.position.end,
  }));
};

const getInvalidRules = (css: Stylesheet): Array<{ className: ClassNameType; rule: Rule }> => {
  let invalidRules = [];
  let invalidClassNames = [];
  let selectors = [];

  css.stylesheet.rules.forEach((rule: Rule & Media) => {
    detectMissingClasses(rule, invalidRules, invalidClassNames, selectors);

    if (rule.type === 'media') {
      rule.rules.forEach((rule: Rule) => {
        detectMissingClasses(rule, invalidRules, invalidClassNames, selectors);
      });
    }
  });

  return [...new Set(invalidRules)];
};

const isClassNameExistInCollection = (
  invalidClassNames: ClassNamesType,
  selectors: SelectorsType,
  className: ClassNameType,
): boolean => !invalidClassNames.includes(className) && !selectors.includes(className);

const detectMissingClasses = (
  rule: Rule,
  invalidRules: Array<Object>,
  invalidClassNames: ClassNamesType,
  selectors: SelectorsType,
) => {
  if (rule.type === 'rule') {
    const selector = rule.selectors[0];

    selectors.push(selector);

    rule.declarations.forEach((declaration: XshouldDeclarationInterface) => {
      if (declaration.property === 'x-should') {
        const ruleDeclaration: RegExpMatchArray = declaration.value.match(/(?=\.)(.*)(?=')/g);
        const classNamesDecl: RegExpMatchArray = ruleDeclaration[0].match(/(\.\S+)/g);

        const className = classNamesDecl[0];

        if (!isClassNameExistInCollection(invalidClassNames, selectors, className)) {
          return;
        }

        if (BemParser.isBemModifier(selector) && BemParser.isBemBlock(className)) {
          const regex = new RegExp(className, 'g');
          const matched = selector.match(regex);

          if (matched.length <= 1) {
            invalidClassNames.push(className);
            invalidRules.push({ className, rule });
          }
        }

        if (BemParser.isBemBlock(selector) && !BemParser.isBemModifier(className) && !BemParser.isBemBlock(className)) {
          invalidClassNames.push(className);
          invalidRules.push({ className, rule });
        }
      }
    });
  }
};
