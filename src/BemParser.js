export default class BemParser {
    static parse(className) {
        let params = null;

        if (BemParser.isBemBlock(className)) {
            params = BemParser.getBlockParam(className);
        } else if (BemParser.isBemModifier(className)) {
            params = BemParser.getModifierParam(className);
        } else {
            return;
        }

        return {"axis": "match", "param": params[0]};
    }

    static getBlockParam(className) {
        const blockPattern = /\S+?(?=__)/g;

        return className.match(blockPattern);
    }

    static getModifierParam(className) {
        const modifierPattern = /\S+?(?=--)/g;

        return className.match(modifierPattern);
    }

    static isBemBlock(className) {
        const blockPattern = /\w+__\w+/g;

        return className.match(blockPattern) ? true : false;
    }

    static isBemModifier(className) {
        const modifierPattern = /\w+--\w+/g;

        return className.match(modifierPattern) ? true : false;
    }
}
