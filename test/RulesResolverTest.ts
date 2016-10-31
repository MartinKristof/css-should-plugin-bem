import test from 'ava';
import RulesResolver from '../src/RulesResolver';
import {RuleInterface} from '../src/RuleInterace';
import {MediaQueryInterface} from '../src/MediaQueryInterface';

test('should resolve rules with bem declarations', t => {
    const rules : Array<RuleInterface | MediaQueryInterface> = [
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
            type: 'media',
            media: '(max-width: 480px)',
            rules: [{
                type: 'rule',
                selectors: ['.tabs__item'],
                declarations: [
                    {foo: 'bar'},
                ],
                position: {boo: 'bazz'}
            }]
        },
        {
            type: 'rule',
            selectors: ['.headline', '#id'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs__item', '.tabs__item--active', '.tabs__item--active::hover'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'media',
            media: '(max-width: 480px)',
            rules: [{
                type: 'rule',
                selectors: ['.tabs__item', '.tabs__item--active', '.tabs'],
                declarations: [
                    {foo: 'bar'},
                ],
                position: {boo: 'bazz'}
            }]
        },
        {
            type: 'rule',
            selectors: ['#id2'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['#id__bem'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
    ];

    const rulesResolver : RulesResolver = new RulesResolver(rules);

    const expectedRules : Array<RuleInterface | MediaQueryInterface> = [
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
            type: 'media',
            media: '(max-width: 480px)',
            rules: [{
                type: 'rule',
                selectors: ['.tabs__item'],
                declarations: [
                    {foo: 'bar'},
                    {type: 'declaration', axis: 'x-should', param: `match \'.tabs *\'`}
                ],
                position: {boo: 'bazz'}
            }]
        },
        {
            type: 'rule',
            selectors: ['.headline'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['#id'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs__item'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', axis: 'x-should', param: `match \'.tabs *\'`}
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs__item--active'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', axis: 'x-should', param: `match \'.tabs *\'`},
                {type: 'declaration', axis: 'x-should', param: `match \'.tabs__item\'`}
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs__item--active::hover'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', axis: 'x-should', param: `match \'.tabs *\'`},
                {type: 'declaration', axis: 'x-should', param: `match \'.tabs__item\'`}
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'media',
            media: '(max-width: 480px)',
            rules: [
                {
                    type: 'rule',
                    selectors: ['.tabs__item'],
                    declarations: [
                        {foo: 'bar'},
                        {type: 'declaration', axis: 'x-should', param: `match \'.tabs *\'`}
                    ],
                    position: {boo: 'bazz'}
                },
                {
                    type: 'rule',
                    selectors: ['.tabs__item--active'],
                    declarations: [
                        {foo: 'bar'},
                        {type: 'declaration', axis: 'x-should', param: `match \'.tabs *\'`},
                        {type: 'declaration', axis: 'x-should', param: `match \'.tabs__item\'`}
                    ],
                    position: {boo: 'bazz'}
                },
                {
                    type: 'rule',
                    selectors: ['.tabs'],
                    declarations: [
                        {foo: 'bar'}
                    ],
                    position: {boo: 'bazz'}
                }
            ]
        },
        {
            type: 'rule',
            selectors: ['#id2'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['#id__bem'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        }
    ];

    t.deepEqual(expectedRules, rulesResolver.resolve());
});
