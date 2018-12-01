import RulesResolver from './RulesResolver';
import { Rule, Stylesheet} from 'css';
import {MediaQueryInterface} from "./MediaQueryInterface";
import {lint} from './lint';

export const preprocess: Function = (ctx: Stylesheet, next: Function): Function => {
    ctx.stylesheet.rules = process(ctx);

    return next();
};

export const process = (ctx: Stylesheet): Array<Rule | MediaQueryInterface> => {
    return (new RulesResolver(ctx.stylesheet.rules)).resolve();
};

export const proccessLint = (ctx: Stylesheet): Array<string> => {
    ctx.stylesheet.rules = process(ctx);

    return lint(ctx);
};

export const name: string = 'BEM';
