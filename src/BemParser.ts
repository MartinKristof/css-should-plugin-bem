export default class BemParser {
    public static parse(className : string) : Array<string> {
        let shouldBePartOf : Array<string> = [];

        if (BemParser.isBemBlock(className)) {
            shouldBePartOf.push(BemParser.getBlockParam(className));
        }

        if (BemParser.isBemModifier(className)) {
            shouldBePartOf.push(BemParser.getModifierParam(className));
        }

        return shouldBePartOf;
    }

    private static getBlockParam(className : string) : string {
        const blockPattern : RegExp= /\S+?(?=__)/g;

        return className.match(blockPattern) && className.match(blockPattern)[0] + ' *';
    }

    private static getModifierParam(className : string) : string {
        const modifierPattern : RegExp = /\S+?(?=--)/g;

        return className.match(modifierPattern) && className.match(modifierPattern)[0];
    }

    private static isBemBlock(className : string) : boolean {
        const blockPattern : RegExp = /\w+__\w+/g;

        return className.match(blockPattern) ? true : false;
    }

    private static isBemModifier(className : string) : boolean {
        const modifierPattern : RegExp = /\w+--\w+/g;

        return className.match(modifierPattern) ? true : false;
    }
}
