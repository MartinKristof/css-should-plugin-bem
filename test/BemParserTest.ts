import test from 'ava';
import BemParser from '../src/BemParser';

const classProvider : Array<any> = [
    {
        description: '.button (modifier)',
        className: '.button.button--primary',
        expectedSub: ['.button'],
    },
    {
        description: '.button (raw)',
        className: '.button',
        expectedSub: [],
    },
    {
        description: '.button (block)',
        className: '.button .button__link',
        expectedSub: ['.button *'],
    },
    {
        description: '.tabs (both)',
        className: '.tabs__link--active',
        expectedSub: ['.tabs *', '.tabs__link'],
    },
    {
        description: '.tabs twice',
        className: '.tabs__link--active, .tabs__link:hover',
        expectedSub: ['.tabs *', '.tabs__link'],
    },
    {
        description: 'nothing',
        className: '',
        expectedSub: [],
    },
    {
        description: 'class on div',
        className: 'div.tabs__item',
        expectedSub: ['.tabs *'],
    },
    {
        description: 'class on anchor (modifier)',
        className: 'a.tabs__link a.tabs__link--active',
        expectedSub: ['.tabs *', '.tabs__link'],
    },
    {
        description: 'class on anchor child (modifier)',
        className: '.tabs__link > .tabs__link--active',
        expectedSub: ['.tabs *', '.tabs__link'],
    },
    {
        description: 'class on anchor with pseudo class',
        className: '.tabs__link:checked',
        expectedSub: ['.tabs *'],
    },
];

classProvider.forEach(provider => {
    test('should be part of ' + provider.description, t => {
        const result : Array<string>  = BemParser.parse(provider.className);

        t.deepEqual(provider.expectedSub, result);
    })
});
