# css-should-plugin-bem

Define semantics of Block element modifier methodics (http://getbem.com/naming/).<br>
This middleware adds special `x-should` properties into given CSS file.<br>
Package `css-should` (https://github.com/robinpokorny/css-should) could works with them and resolves whether CSS classes are written correctly according to BEM.
Under MIT Licence.

##Installation
Package is available on NPM (https://www.npmjs.com/package/css-should-plugin-bem) and you could install like this:
`npm instal css-should-plugin-bem` or `yarn add css-should-plugin-bem`

### Scripts

* `yarn` or `npm install` - install dependencies

You can use both `yarn` or `npm run` to control application flow.

* `compile` - Starts Next.js application
* `lint` - Lint example CSS file and show results in CLI.
* `lint-with-error` - Lint example CSS file to demonstrate bad named classes according to BEM and show results in CLI.
* `declarations` - Get BEM declarations for *CSS-should*, show them in CLI and save output into file.
* `declarations-with-errors` - get BEM declarations with bad named classes according to BEM for *CSS-should*, show them in CLI and save output into file.
* `build` - Build dist file with Webpack.
* `build:lib` - Build lib files.
* `test` - Runs AVA tests.
* `tsc` - Runs typescript compiler.
* `prettier:check` - Check pretty of code.
* `prettier:fix` - Runs prettyfying of code.

#Examples
* run `npm run lint` to lint example CSS file and show results in CLI<br>
* run `npm run lint-with-error` to lint example CSS file to demonstrate bad named classes according to BEM and show results in CLI<br>
* run `npm run declarations` to get BEM declarations for *CSS-should*, show them in CLI and save output into file<br>
* run `npm run declarations-with-errors` to get BEM declarations with bad named classes according to BEM for *CSS-should*, show them in CLI and save output into file<br>
