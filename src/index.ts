import RulesResolver from './RulesResolver';
import {Stylesheet} from 'css';

export const preprocess : Function = (ctx : Stylesheet, next : Function) : Function => {
    ctx.stylesheet.rules = (new RulesResolver(ctx.stylesheet.rules)).resolve();

    return next();
};

export const name : string = 'BEM';
