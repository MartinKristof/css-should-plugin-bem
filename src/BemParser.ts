import { ClassNameType } from './lint';

export default class BemParser {
  public static parse(className: ClassNameType): string[] {
    let parts: string[] = [];

    parts = BemParser.getParts(className, parts, BemParser.isBemBlock(className), BemParser.getBlockParam);
    parts = BemParser.getParts(className, parts, BemParser.isBemModifier(className), BemParser.getModifierParam);

    return parts;
  }

  public static isBemBlock(className: ClassNameType): boolean {
    return !!className.match(BemParser.BLOCK_PATTERN);
  }

  public static isBemModifier(className: ClassNameType): boolean {
    return !!className.match(BemParser.MODIFIER_PATTERN);
  }
  private static BLOCK_PATTERN: RegExp = /\S+__\S+/g;
  private static MODIFIER_PATTERN: RegExp = /\S+--\S+/g;

  private static getParts(
    className: ClassNameType,
    shouldBePartOf: string[],
    bemType: boolean,
    getParam: (className: ClassNameType) => string,
  ): string[] {
    if (!bemType) {
      return shouldBePartOf;
    }

    const parts: string[] = className.split('.').filter(Boolean);

    parts.forEach((part) => {
      part = getParam(part);

      if (part && !shouldBePartOf.includes(part)) {
        shouldBePartOf.push(part);
      }
    });

    return shouldBePartOf;
  }

  private static getBlockParam(className: ClassNameType): string {
    const blockPattern: RegExp = /\S+?(?=__)/g;

    return className.match(blockPattern) && '.' + className.match(blockPattern)[0] + ' *';
  }

  private static getModifierParam(className: ClassNameType): string {
    const modifierPattern: RegExp = /\S+?(?=--)/g;

    return className.match(modifierPattern) && '.' + className.match(modifierPattern)[0];
  }
}
