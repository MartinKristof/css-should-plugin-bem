import test from 'ava-ts';
import { name, preprocess, processLint } from '../src';

test('should get preproccess', (t) => {
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
          selectors: ['.hr--small.hr--spaced'],
          declarations: [{ foo: 'bar' }],
          position: { source: 'source1', start: 'start1', end: 'end1' },
        },
      ],
    },
  };

  t.deepEqual(processLint(ctx), {
    isBemDetected: true,
    isValid: false,
    rules: [
      { missingClassName: '.hamburger-nav', selector: '.hamburger-nav__list-item--separator' },
      { missingClassName: '.hamburger-nav__list-item', selector: '.hamburger-nav__list-item--separator' },
      { missingClassName: '.hr', selector: '.hr--small.hr--spaced' },
    ],
  });
});

test('should get name', (t) => t.is(name, 'BEM'));
