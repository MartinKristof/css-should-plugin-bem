import test from 'ava-ts';
import BemParser from '../src/BemParser';

const classProvider: Array<any> = [
  {
    description: '.button (modifier)',
    className: '.button.button--primary',
    expectedSub: ['.button'],
  },
  {
    description: '.button (raw)',
    className: '.button',
    expectedSub: [],
  },
  {
    description: '.button (block)',
    className: '.button .button__link',
    expectedSub: ['.button *'],
  },
  {
    description: '.tabs (both)',
    className: '.tabs__link--active',
    expectedSub: ['.tabs *', '.tabs__link'],
  },
  {
    description: '.tabs twice',
    className: '.tabs__link:hover',
    expectedSub: ['.tabs *'],
  },
  {
    description: 'nothing',
    className: '',
    expectedSub: [],
  },
  {
    description: 'class on div',
    className: 'div.tabs__item',
    expectedSub: ['.tabs *'],
  },
  {
    description: 'class on anchor (modifier)',
    className: 'a.tabs__link--active',
    expectedSub: ['.tabs *', '.tabs__link'],
  },
  {
    description: 'class on anchor with pseudo class',
    className: '.tabs__link:checked',
    expectedSub: ['.tabs *'],
  },
  {
    description: 'list with modifier',
    className: 'ul.menu--primary',
    expectedSub: ['.menu'],
  },
  {
    description: 'modifier with entire element',
    className: 'i.item__icon.item__icon--spinning',
    expectedSub: ['.item *', '.item__icon'],
  },
  {
    description: 'modifier without parent element',
    className: '.item--bold',
    expectedSub: ['.item'],
  },
  {
    description: 'modifier on pseudo classes',
    className: 'a.item--bold:active',
    expectedSub: ['.item'],
  },
];

classProvider.forEach((provider) => {
  test('should be part of ' + provider.description, (t) => {
    const result: Array<string> = BemParser.parse(provider.className);

    t.deepEqual(result, provider.expectedSub);
  });
});
