import test from 'ava';
import RulesResolver from '../src/RulesResolver';
import {MediaQueryInterface} from '../src/MediaQueryInterface';
import {Rule} from 'css';

test('should resolve rules with bem declarations', t => {
    const rules : Array<Rule | MediaQueryInterface> = [
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
                selectors: ['.tabs.tabs__item'],
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
            selectors: ['.tabs.tabs__item', '.tabs__item--active', '.tabs__item--active::hover'],
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
        {
            type: 'rule',
            selectors: ['.button.button--primary'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.button .button__link'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs > a.tabs__link'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.menu--primary .item--bold'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['ul.menu--primary'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['body .menu--primary'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['#page.item .item--primary .item--secondary'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.menu__nav--primary i.item__icon.item__icon--spinning'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.menu>.item--bold'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['a[lang|=cs].item--bold'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['*:hover .item--disabled+a.item--bold:active'],
            declarations: [{foo: 'bar'}],
            position: {boo: 'bazz'}
        }
    ];

    const rulesResolver : RulesResolver = new RulesResolver(rules);

    const expectedRules : Array<Rule | MediaQueryInterface> = [
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
                selectors: ['.tabs.tabs__item'],
                declarations: [
                    {foo: 'bar'},
                    {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`}
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
            selectors: ['.tabs.tabs__item'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`}
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs__item--active'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`},
                {type: 'declaration', property: 'x-should', value: `match \'.tabs__item\'`}
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs__item--active::hover'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`},
                {type: 'declaration', property: 'x-should', value: `match \'.tabs__item\'`}
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
                        {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`}
                    ],
                    position: {boo: 'bazz'}
                },
                {
                    type: 'rule',
                    selectors: ['.tabs__item--active'],
                    declarations: [
                        {foo: 'bar'},
                        {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`},
                        {type: 'declaration', property: 'x-should', value: `match \'.tabs__item\'`}
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
        },
        {
            type: 'rule',
            selectors: ['.button.button--primary'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.button\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.button .button__link'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.button *\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.tabs > a.tabs__link'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.tabs *\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.menu--primary .item--bold'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.item\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['ul.menu--primary'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.menu\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['body .menu--primary'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.menu\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['#page.item .item--primary .item--secondary'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.item\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.menu__nav--primary i.item__icon.item__icon--spinning'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.item *\'`},
                {type: 'declaration', property: 'x-should', value: `match \'.item__icon\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['.menu>.item--bold'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.item\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['a[lang|=cs].item--bold'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.item\'`},
            ],
            position: {boo: 'bazz'}
        },
        {
            type: 'rule',
            selectors: ['*:hover .item--disabled+a.item--bold:active'],
            declarations: [
                {foo: 'bar'},
                {type: 'declaration', property: 'x-should', value: `match \'.item\'`},
            ],
            position: {boo: 'bazz'}
        },
    ];

    t.deepEqual(expectedRules, rulesResolver.resolve());
});
