/**
 * Returns with selectors which are written according to BEM methodics
 */
export default class RulesResolver {
    constructor(rules) {
        this.rules = rules;
    }

    getBemRules() {
        return this.rules.filter(function (rule) {
            const selector = rule.selectors[0];
            rule.isBem = false;

            if (RulesResolver.isCssClass(selector)) {
                if (RulesResolver.isBemBlock(selector) || RulesResolver.isBemModifier(selector)) {
                    rule.isBem = true;

                    return selector;
                }
            }
        });
    }

    static isCssClass(className) {
        const pattern = /(\.\S+)/g;

        return className.match(pattern) ? true : false;
    }

    static isBemModifier(className) {
        const modifierPattern = /\w+--\w+/g;

        return className.match(modifierPattern) ? true : false;
    }

    static isBemBlock(className) {
        const blockPattern = /\w+__\w+/g;

        return className.match(blockPattern) ? true : false;
    }
}
