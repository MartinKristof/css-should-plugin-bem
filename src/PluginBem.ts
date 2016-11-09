import RulesResolver from './RulesResolver';
import {RuleInterface} from './RuleInterace';
import {MediaQueryInterface} from './MediaQueryInterface';

export default class PluginBem {
    constructor(private rules : Array<RuleInterface|MediaQueryInterface>) {}

    public getPlugin() : RulesResolver {
        return new RulesResolver(this.rules);
    }
}
