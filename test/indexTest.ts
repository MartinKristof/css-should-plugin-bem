import test from 'ava';
import {preprocess, name} from '../src/index';
import {Stylesheet} from 'css';

test('should get preproccess', t => {
    let ctx : Stylesheet = {
        stylesheet: {
            rules: [
                {
                    type: 'media',
                    media: '(max-width: 480px)',
                    rules: [{
                        type: 'rule',
                        selectors: ['.tabs'],
                        declarations: [{foo: 'bar'}],
                        position: {boo: 'bazz'}
                    }]
                },
                {
                    type: 'rule',
                    selectors: ['.button.button--primary'],
                    declarations: [{foo: 'bar'}],
                    position: {boo: 'bazz'}
                },
            ]
        }
    };

    t.deepEqual('next', preprocess(ctx, () => {
        return 'next';
    }))
});

test('should get name', t => {
    t.is('BEM', name);
});
