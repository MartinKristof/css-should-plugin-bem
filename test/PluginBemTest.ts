import test from 'ava';
import PluginBem from '../src/PluginBem';
import RulesResolver from '../src/RulesResolver';

test('should get rules resolver', t => {
    const rules : Array<any> = [
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
    ];

    const plugin = new PluginBem(rules);
    const resolver = new RulesResolver(rules);

    t.deepEqual(resolver, plugin.getPlugin())
});
