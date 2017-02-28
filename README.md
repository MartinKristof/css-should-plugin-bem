# css-should-plugin-bem

Define semantics of Block element modifier methodics (http://getbem.com/naming/).<br>
This middleware adds special `x-should` properties into given CSS file.<br>
Package `css-should` (https://github.com/robinpokorny/css-should) could works with them and resolves whether CSS classes are written correctly according to BEM.
Under MIT Licence.

##Installation
Package is available on NPM (https://www.npmjs.com/package/css-should-plugin-bem) and you could install like this:
`npm instal css-should-plugin-bem`

#Example
run `npm run lint` to lint example CSS file and show results in CLI<br>
run `npm run lint-with-error` to lint example CSS file to demonstrate bad named classes according to BEM and show results in CLI<br>
run `npm run declarations` to get BEM declarations for *CSS-should*, show them in CLI and save output into file<br>
run `npm run declarations-with-errors` to get BEM declarations with bad named classes according to BEM for *CSS-should*, show them in CLI and save output into file<br>

# v1.2.0
- edit dir structure on *example* dir
- edit types

# v1.1.0
- add ability to add BEM declarations into given CSS file
- add linting of CSS classes according to BEM

# v1.0.0
- add example (output on console and into file)
- remove *RuleInterface* (replaced with Rule from css package)

# v0.8.0
- make plugin as public

# v0.7.0
- add main path of package into package.json

# v0.6.0
- *PluginBem* renamed to *index* with correct public API
- fix *BemParserTest* description of test cases

# v0.5.0
- remove CSS files 
- remove index
- add *PluginBem* to export plugin
- fix UT and algorithm

# v0.4.0
- edit parser to cope more specific rules

# v0.3.0
- rewritten to TypeScript
- add UT in AVA
- add support of media queries
- add final syntax of declaration

# v0.2.0
- rename project
- add rules for *css-should*
- reading css from file is now implemented

# v0.1.0
- CSS Tree is now decorated with flag, whether is element with any CSS class written according to BEM methodics
