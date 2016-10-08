import css from 'css';
import fs from 'fs';
import RulesResolver from './RulesResolver';

const cssFile = fs.readFileSync('../source/css.css', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    return data;
});

const obj = css.parse(cssFile);
const rules = obj.stylesheet.rules;

const resolver = new RulesResolver(rules);

resolver.getBemRules();

console.log(rules);

