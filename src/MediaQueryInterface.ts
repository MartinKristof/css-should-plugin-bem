import {RuleInterface} from './RuleInterace';

export interface MediaQueryInterface {
    type : string;
    media: string;
    rules : Array<RuleInterface>;
}
