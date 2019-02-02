import RulesResolver from './RulesResolver';
import { Rule, Stylesheet } from 'css';
import { MediaQueryInterface } from './MediaQueryInterface';
import { lint, LintRuleType } from './lint';

const process = (ctx: Stylesheet): Array<Rule | MediaQueryInterface> => {
  return new RulesResolver(ctx.stylesheet.rules).resolve();
};

export const preprocess: Function = (ctx: Stylesheet, next: Function): Function => {
  ctx.stylesheet.rules = process(ctx);

  return next();
};

export const processLint = (
  ctx: Stylesheet,
): { rules: Array<LintRuleType>; isValid: boolean; isBemDetected: boolean } => {
  ctx.stylesheet.rules = process(ctx);

  return lint(ctx);
};

export const name: string = 'BEM';
