import parser from './BemParser';

/**
 * Returns with selectors which are written according to BEM methodics
 */
export default class RulesResolver {
    constructor(rules) {
        this.rules = rules;
    }

    getBemRules() {
        return this.rules.filter(function (rule) {
            let selector = rule.selectors[0];

            if (RulesResolver.isCssClass(selector)) {
                let rules;

                if (rules = parser.parse(selector)) {
                    rule.rules = rules;
                }

                return selector;
            }
        });
    }

    static isCssClass(className) {
        const pattern = /(\.\S+)/g;

        return className.match(pattern) ? true : false;
    }
}
