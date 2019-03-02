import test from 'ava-ts';
import { Rule } from 'css';
import { IMediaQuery } from '../src/IMediaQuery';
import RulesResolver from '../src/RulesResolver';

test('should resolve rules with bem declarations', (t) => {
  const rules: Array<Rule | IMediaQuery> = [
    {
      type: 'media',
      media: '(max-width: 480px)',
      rules: [
        {
          type: 'rule',
          selectors: ['.tabs'],
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
      ],
    },
    {
      type: 'media',
      media: '(max-width: 480px)',
      rules: [
        {
          type: 'rule',
          selectors: ['.tabs.tabs__item'],
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
      ],
    },
    {
      type: 'rule',
      selectors: ['.headline', '#id'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.tabs.tabs__item', '.tabs__item--active', '.tabs__item--active::hover'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'media',
      media: '(max-width: 480px)',
      rules: [
        {
          type: 'rule',
          selectors: ['.tabs__item', '.tabs__item--active', '.tabs'],
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
      ],
    },
    {
      type: 'rule',
      selectors: ['#id2'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['#id__bem'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.button.button--primary'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.button .button__link'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.tabs > a.tabs__link'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.menu--primary .item--bold'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['ul.menu--primary'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['body .menu--primary'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['#page.item .item--primary .item--secondary'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.menu__nav--primary i.item__icon.item__icon--spinning'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.menu>.item--bold'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['a[lang|=cs].item--bold'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['*:hover .item--disabled+a.item--bold:active'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.search-form__slovnik-select-wrap szn-select[data-szn-select--single]'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.hamburger-nav__list-item--separator'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.hr--small.hr--spaced'],
      declarations: [{ foo: 'bar' }],
      position: { source: 'source1', start: 'start1', end: 'end1' },
    },
  ];

  const rulesResolver: RulesResolver = new RulesResolver(rules);

  const expectedRules: Array<Rule | IMediaQuery> = [
    {
      type: 'media',
      media: '(max-width: 480px)',
      rules: [
        {
          type: 'rule',
          selectors: ['.tabs'],
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
      ],
    },
    {
      type: 'media',
      media: '(max-width: 480px)',
      rules: [
        {
          type: 'rule',
          selectors: ['.tabs.tabs__item'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` }],
          position: { boo: 'bazz' },
        },
      ],
    },
    {
      type: 'rule',
      selectors: ['.headline'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['#id'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.tabs.tabs__item'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.tabs__item--active'],
      declarations: [
        { foo: 'bar' },
        { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` },
        { type: 'declaration', property: 'x-should', value: `match \'.tabs__item\'` },
      ],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.tabs__item--active::hover'],
      declarations: [
        { foo: 'bar' },
        { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` },
        { type: 'declaration', property: 'x-should', value: `match \'.tabs__item\'` },
      ],
      position: { boo: 'bazz' },
    },
    {
      type: 'media',
      media: '(max-width: 480px)',
      rules: [
        {
          type: 'rule',
          selectors: ['.tabs__item'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` }],
          position: { boo: 'bazz' },
        },
        {
          type: 'rule',
          selectors: ['.tabs__item--active'],
          declarations: [
            { foo: 'bar' },
            { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` },
            { type: 'declaration', property: 'x-should', value: `match \'.tabs__item\'` },
          ],
          position: { boo: 'bazz' },
        },
        {
          type: 'rule',
          selectors: ['.tabs'],
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
      ],
    },
    {
      type: 'rule',
      selectors: ['#id2'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['#id__bem'],
      declarations: [{ foo: 'bar' }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.button.button--primary'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.button\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.button .button__link'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.button *\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.tabs > a.tabs__link'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.tabs *\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.menu--primary .item--bold'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.item\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['ul.menu--primary'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.menu\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['body .menu--primary'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.menu\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['#page.item .item--primary .item--secondary'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.item\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.menu__nav--primary i.item__icon.item__icon--spinning'],
      declarations: [
        { foo: 'bar' },
        { type: 'declaration', property: 'x-should', value: `match \'.item *\'` },
        { type: 'declaration', property: 'x-should', value: `match \'.item__icon\'` },
      ],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.menu>.item--bold'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.item\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['a[lang|=cs].item--bold'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.item\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['*:hover .item--disabled+a.item--bold:active'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: `match \'.item\'` }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.search-form__slovnik-select-wrap szn-select[data-szn-select--single]'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.search-form *'" }],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.hamburger-nav__list-item--separator'],
      declarations: [
        { foo: 'bar' },
        { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav *'" },
        { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav__list-item'" },
      ],
      position: { boo: 'bazz' },
    },
    {
      type: 'rule',
      selectors: ['.hr--small.hr--spaced'],
      declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.hr'" }],
      position: { source: 'source1', start: 'start1', end: 'end1' },
    },
  ];

  t.deepEqual(rulesResolver.resolve(), expectedRules);
});
