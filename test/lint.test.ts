import test from 'ava-ts';
import { lint } from '../src/lint';

test('should lint', (t) => {
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
          position: { boo: 'bazz' },
        },
      ],
    },
  };

  t.deepEqual(lint(ctx), ['.button']);
});
