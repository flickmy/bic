# Bic

## It's a

- Framework to build websites
- Thin wrapper around Gulp tasks, defaults configurations and webpack
- Work in progress

> Still reading?

## Supported features are

- Config management using [Nconf](https://github.com/indexzero/nconf)
- Build task control flow using [Gulp](https://github.com/gulpjs) & [Gulp Sequence](https://github.com/teambition/gulp-sequence)
- [LiveReload](http://www.browsersync.io/docs/gulp/#gulp-reload) + [BrowserSync](http://www.browsersync.io/) & [Express](http://expressjs.com/) + [Nodemon](http://nodemon.io/) server
- JS & CSS code splitting for multiple entry points/pages using [webpack](https://github.com/webpack/webpack)
- Custom Modernizr using [Customizr](https://github.com/doctyper/customizr)
- Unused CSS removal using [Purify CSS](https://github.com/purifycss/purifycss)
- Image optimization
- SVG sprite generation
- HTML, CSS, JS & JSON minification
- HTML, CSS, JS, JSON & Color linting
- JS & SASS style validation & formatting
- Gzip compression
- Favicon generation
- Deployment to AWS S3 + CloudFront
- Asset filename versioning (for browser cache busting)
- Convert root relative paths to relative for deployment to sub-directories

## Supported demo features are

- Project boilerplate generator using [Yeoman](http://yeoman.io) & [Slush](https://github.com/slushjs/slush)
- Package formatting using [Fixpack](https://github.com/henrikjoreteg/fixpack)
- Package versioning using [Bump CLI](https://github.com/rstacruz/bump-cli)
- Async unit testing using [Blue Tape](https://github.com/spion/blue-tape)
- Local module development support using [Symlink](https://github.com/clux/symlink)
- Git commits using [Commitizen](https://github.com/commitizen)
- Git hooks using [Ghooks](https://github.com/gtramontina/ghooks)
- Generate TODO & FIXME list
- Generate README & LICENSE docs

## Future supported features may be

- Config add & override using [Lodash](https://lodash.com/)
- Unit testing and coverage reporting using [Lab](https://github.com/hapijs/lab)
- JS & CSS documentation generation using [DocumentJS](http://documentjs.com/)
- Performance budget reports using [Sitespeed](https://www.sitespeed.io/) & [Juve](https://github.com/jared-stilwell/juve)
- Release management using [Semantic Release](https://github.com/semantic-release/semantic-release) & [Greenkeeper](http://greenkeeper.io/)
- JS reports using [JS Inspect](https://github.com/danielstjules/jsinspect) & [Plato](https://github.com/es-analysis/plato)
- CSS reports using [Parker](https://github.com/katiefenn/parker) & [Analyze CSS](https://github.com/macbre/analyze-css)
- Visual regression testing using [Ghost Inspector](https://ghostinspector.com/)
- Accessibility report using [AccessSniff](https://github.com/yargalot/AccessSniff)
- Control flow using [Vo](https://github.com/lapwinglabs/vo)
- Config management using [Confidence](https://github.com/hapijs/confidence)
- CLI using [Vorpal](https://github.com/dthree/vorpal)


## Things that won't happen are

- More template engine support - The demo uses Jade. JSX is another option.
