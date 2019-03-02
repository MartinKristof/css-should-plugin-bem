import { Rule, Stylesheet } from 'css';
import { IMediaQuery } from './IMediaQuery';
import { ILintRule, lint } from './lint';
import RulesResolver from './RulesResolver';

const process = (ctx: Stylesheet): Array<Rule | IMediaQuery> => new RulesResolver(ctx.stylesheet.rules).resolve();

export const preprocess = (ctx: Stylesheet, next: () => any): any => {
  ctx.stylesheet.rules = process(ctx);

  return next();
};

export const processLint = (ctx: Stylesheet): { rules: ILintRule[]; isValid: boolean; isBemDetected: boolean } => {
  ctx.stylesheet.rules = process(ctx);

  return lint(ctx);
};

export const name: string = 'BEM';
