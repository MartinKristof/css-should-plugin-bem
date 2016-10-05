import css from 'css';
import RulesResolver from './RulesResolver';

const cssString = 'body {color:red;} .button {font-size:12px;} .button--primary {color:red;} .button__title {height: 30px;} .some-class-name__element-name-longer--modifier-name-longer:focus {display: none;}';
const obj = css.parse(cssString);
const rules = obj.stylesheet.rules;

const resolver = new RulesResolver(rules);

resolver.getBemRules();

console.log(rules);
