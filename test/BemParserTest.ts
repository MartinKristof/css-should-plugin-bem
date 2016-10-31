import test from 'ava';
import BemParser from '../src/BemParser';

const classProvider : Array<any> = [
    {
        description: '.button (modifier)',
        className: '.button .button--primary',
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
];

classProvider.forEach(provider => {
    test('should be part of ' + provider.description, t => {
        const result : Array<string>  = BemParser.parse(provider.className);

        t.deepEqual(provider.expectedSub, result);
    })
});
