import test from 'ava-ts';
import {preprocess, process, proccessLint, name} from '../src';

let ctx = {
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

test('should get preproccess', t => {
    let ctx = {
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

    t.deepEqual(preprocess(ctx, () => 'next'), 'next')
});

test('should get process', t => {
    t.deepEqual(
        process(ctx),
        [
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
                declarations: [{foo: 'bar'}, {
                    property: 'x-should',
                    type: 'declaration',
                    value: 'match \'.button\'',
                },],
                position: {boo: 'bazz'}
            },
        ],
    )
});

test('should get processLint', t => {
    t.deepEqual(proccessLint(ctx), ['.button'])
});

test('should get name', t => {
    t.is(name, 'BEM');
});
