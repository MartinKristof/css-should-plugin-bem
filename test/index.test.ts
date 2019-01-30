import test from 'ava-ts';
import { preprocess, processLint, name } from '../src';

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
        declarations: [{ foo: 'bar' }],
        position: { boo: 'bazz' },
      },
      {
        type: 'rule',
        selectors: ['.hamburger-nav__list-item--separator'],
        declarations: [{ foo: 'bar' }],
        position: { boo: 'bazz' },
      },
    ],
  },
};

test('should get preproccess', (t) => {
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
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item--separator'],
          declarations: [{ foo: 'bar' }],
          position: { boo: 'bazz' },
        },
      ],
    },
  };

  t.deepEqual(preprocess(ctx, () => 'next'), 'next');
});

test('should get processLint', (t) => {
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
          selectors: ['.button.button--primary'],
          declarations: [{ foo: 'bar' }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item--separator'],
          declarations: [{ foo: 'bar' }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
        {
          type: 'rule',
          selectors: ['.hamburger-nav__list-item--separator'],
          declarations: [{ foo: 'bar' }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
      ],
    },
  };

  t.deepEqual(processLint(ctx), [
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

test('should get name', (t) => {
  t.is(name, 'BEM');
});
