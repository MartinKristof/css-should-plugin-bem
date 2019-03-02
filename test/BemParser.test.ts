import test from 'ava-ts';
import BemParser from '../src/BemParser';

const classProvider: any[] = [
  {
    description: '.button (modifier)',
    className: '.button.button--primary',
    expected: ['.button'],
  },
  {
    description: '.button (raw)',
    className: '.button',
    expected: [],
  },
  {
    description: '.button (block)',
    className: '.button .button__link',
    expected: ['.button *'],
  },
  {
    description: '.tabs (both)',
    className: '.tabs__link--active',
    expected: ['.tabs *', '.tabs__link'],
  },
  {
    description: '.tabs twice',
    className: '.tabs__link:hover',
    expected: ['.tabs *'],
  },
  {
    description: 'nothing',
    className: '',
    expected: [],
  },
  {
    description: 'class on div',
    className: 'div.tabs__item',
    expected: ['.tabs *'],
  },
  {
    description: 'class on anchor (modifier)',
    className: 'a.tabs__link--active',
    expected: ['.tabs *', '.tabs__link'],
  },
  {
    description: 'class on anchor with pseudo class',
    className: '.tabs__link:checked',
    expected: ['.tabs *'],
  },
  {
    description: 'list with modifier',
    className: 'ul.menu--primary',
    expected: ['.menu'],
  },
  {
    description: 'modifier with entire element',
    className: 'i.item__icon.item__icon--spinning',
    expected: ['.item *', '.item__icon'],
  },
  {
    description: 'modifier without parent element',
    className: '.item--bold',
    expected: ['.item'],
  },
  {
    description: 'modifier on pseudo classes',
    className: 'a.item--bold:active',
    expected: ['.item'],
  },
];

classProvider.forEach(({ description, className, expected }) =>
  test(`should be part of ${description}`, (t) => {
    const result: string[] = BemParser.parse(className);

    t.deepEqual(result, expected);
  }),
);

const classNameBlockProvider: any[] = [
  {
    description: '.button--primary',
    className: '.button--primary',
    expected: false,
  },
  {
    description: '.button__new',
    className: '.button__new',
    expected: true,
  },
  {
    description: 'with empty space inside',
    className: '.button  __  new',
    expected: false,
  },
  {
    description: 'with empty space around',
    className: '   .button__new   ',
    expected: true,
  },
  {
    description: '.button',
    className: '.button',
    expected: false,
  },
  {
    description: '',
    className: 'empty string',
    expected: false,
  },
];

classNameBlockProvider.forEach(({ description, className, expected }) =>
  test(`should be isBemBlock of ${description}`, (t) => t.deepEqual(BemParser.isBemBlock(className), expected)),
);

const classNameModifierProvider: any[] = [
  {
    description: '.button--primary',
    className: '.button--primary',
    expected: true,
  },
  {
    description: '.button__new',
    className: '.button__new',
    expected: false,
  },
  {
    description: 'with empty space inside',
    className: '.button  --  primary',
    expected: false,
  },
  {
    description: 'with empty space around',
    className: '   .button--primary   ',
    expected: true,
  },
  {
    description: '.button',
    className: '.button',
    expected: false,
  },
  {
    description: '',
    className: 'empty string',
    expected: false,
  },
];

classNameModifierProvider.forEach(({ description, className, expected }) =>
  test(`should be isBemModifier of ${description}`, (t) => t.deepEqual(BemParser.isBemModifier(className), expected)),
);
