"use strict";
const fs = require('fs');
const path = require('path');
const css_1 = require('css');
const diff_1 = require('diff');
const chalk = require('chalk');
const src_1 = require('../src');
const ENCODING = 'utf8';
const cssFile = fs.readFileSync(path.join(__dirname, './example.css'), ENCODING);
const css = css_1.parse(cssFile);
src_1.preprocess(css, () => { });
const newCssFile = css_1.stringify(css);
const diff = diff_1.diffLines(cssFile, newCssFile);
diff.forEach((part) => {
    const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
    process.stderr.write(chalk[color](part.value));
});
console.log();
const newFilePath = path.join(__dirname, './example-out.css');
console.log('Write the new file in ' + newFilePath);
//# sourceMappingURL=index.js.map