/* tslint:disable:object-literal-sort-keys */
import test from 'ava-ts';
import { lint } from '../src/lint';

test('should get Invalid Rules if exist', (t) => {
  const ctx = {
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
          selectors: ['.nav.nav--main'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.nav *'" }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.nav__list'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.nav *'" }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.xyf__footer__sel'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.xyf *'" }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.xyf__footer__foo'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.xyf *'" }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hr--small.hr--spaced'],
          declarations: [{ foo: 'bar' }, { type: 'declaration', property: 'x-should', value: "match '.hr'" }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
      ],
    },
  };

  t.deepEqual(lint(ctx), {
    rules: [
      {
        missingClassName: '.hamburger-nav',
        selector: '.hamburger-nav__list-item--separator',
      },
      {
        missingClassName: '.hamburger-nav__list-item',
        selector: '.hamburger-nav__list-item--separator',
      },
      {
        missingClassName: '.xyf',
        selector: '.xyf__footer__sel',
      },
      {
        missingClassName: '.xyf',
        selector: '.xyf__footer__foo',
      },
      {
        missingClassName: '.hr',
        selector: '.hr--small.hr--spaced',
      },
    ],
    isValid: false,
    isBemDetected: true,
  });
});

test('should get Invalid Rules if not exist', (t) => {
  const ctx = {
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

  t.deepEqual(lint(ctx), { rules: [], isValid: true, isBemDetected: true });
});

test('should get is BEM not detected', (t) => {
  const ctx = {
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
      ],
    },
  };

  t.deepEqual(lint(ctx), { rules: [], isValid: false, isBemDetected: false });
});
