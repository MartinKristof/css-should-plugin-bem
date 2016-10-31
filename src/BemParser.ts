export default class BemParser {
    public static parse(className : string) : Array<string> {
        let shouldBePartOf : Array<string> = [];

        shouldBePartOf = BemParser.getParts(
            className, shouldBePartOf, BemParser.isBemBlock(className), BemParser.getBlockParam
        );

        shouldBePartOf = BemParser.getParts(
            className, shouldBePartOf, BemParser.isBemModifier(className), BemParser.getModifierParam
        );

        return shouldBePartOf;
    }

    private static getParts(className : string, shouldBePartOf : Array<string>, bemType : boolean, getParam : Function) : Array<string> {
        if (!bemType) {
            return shouldBePartOf;
        }

        const parts = className.split('.').filter(Boolean);
        parts.forEach((part) => {
            part = getParam(part);

            if (part && shouldBePartOf.indexOf(part) === -1) {
                shouldBePartOf.push(part);
            }
        });

        return shouldBePartOf;
    }

    private static getBlockParam(className : string) : string {
        const blockPattern : RegExp = /\S+?(?=__)/g;

        return className.match(blockPattern) && '.' + className.match(blockPattern)[0] + ' *';
    }

    private static getModifierParam(className : string) : string {
        const modifierPattern : RegExp = /\S+?(?=--)/g;

        return className.match(modifierPattern) && '.' + className.match(modifierPattern)[0];
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
