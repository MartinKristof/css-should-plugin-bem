import test from 'ava-ts';
import { lint } from '../src/lint';

test('should get Invalid Rules if exist', (t) => {
  let ctx = {
    stylesheet: {
      rules: [
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
          type: 'rule',
          selectors: ['.button.button--primary'],
          declarations: [
            { foo: 'bar' },
            {
              property: 'x-should',
              type: 'declaration',
              value: "match '.button'",
            },
          ],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item--separator'],
          declarations: [
            { foo: 'bar' },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav *'" },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav__list-item'" },
          ],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item--separator'],
          declarations: [
            { foo: 'bar' },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav *'" },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav__list-item'" },
          ],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
      ],
    },
  };

  t.deepEqual(lint(ctx), [
    {
      missingClassName: '.hamburger-nav',
      selector: '.hamburger-nav__list-item--separator',
      end: 'end1',
      source: 'source1',
      start: 'start1',
    },
    {
      missingClassName: '.hamburger-nav__list-item',
      selector: '.hamburger-nav__list-item--separator',
      end: 'end1',
      source: 'source1',
      start: 'start1',
    },
  ]);
});

test('should get Invalid Rules if not exist', (t) => {
  let ctx = {
    stylesheet: {
      rules: [
        {
          type: 'media',
          media: '(max-width: 480px)',
          rules: [
            {
              type: 'rule',
              selectors: ['.tabs'],
              declarations: [{ foo: 'bar' }],
              position: { source: 'source1', start: 'start1', end: 'end1' },
            },
          ],
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav'],
          declarations: [{ foo: 'bar' }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item'],
          declarations: [
            { foo: 'bar' },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav *'" },
          ],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item--separator'],
          declarations: [
            { foo: 'bar' },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav *'" },
            { type: 'declaration', property: 'x-should', value: "match '.hamburger-nav__list-item'" },
          ],
          position: { source: 'source1', start: 'start2', end: 'end2' },
        },
      ],
    },
  };

  t.deepEqual(lint(ctx), []);
});
