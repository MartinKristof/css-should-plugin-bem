import RulesResolver from './RulesResolver';

export const preprocess : Function = (ctx : any, next : Function) => {
    ctx.css.rules = (new RulesResolver(ctx.css.rules)).resolve();

    return next();
};

export const name : string = 'BEM';
