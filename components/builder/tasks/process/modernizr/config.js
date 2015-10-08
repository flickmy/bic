'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {

  // Run on the compiled source to only include active references
  cwd: cfg.dir.dest,

  src: [
    cfg.patterns.js,
    cfg.patterns.css,
    cfg.patterns.ignore(path.join('**', cfg.dir.vendor, '**'))
  ],

  dest: path.join(cfg.dir.generated, 'js'),

  filename: 'modernizr.js',

  // TODO: Explore caching to crawl on re-build https://github.com/doctyper/customizr#caching
  // XXX: Task is run once during sequences/local, will need to re-run manually for new tests to be crawled
  crawl: true, // cfg.release === true ? true : false

  // Adds all tests for 'development' env
  // Detects used tests for 'production' env
  settings: {
    cache: true,
    uglify: false,
    options: [
      'setClasses',
      'addTest',
      'testProp',
      'prefixed'
    ],
    excludeTests: [

      // XXX: Otherwise Bootstrap hides the <html> element when `crawl === true`
      'hidden',

      // No idea why these are picked up by the customizr.
      'target',
      'template',
      'animation',
      'cors',
      'opacity',
      'search',
      'srcset',
      'contains',
      'checked',

      // XXX: Otherwise Bootstrap hides the <html> element when `crawl === false`
      'dom/hidden',

      // XXX: Otherwise Modernizr throws fatal JS error
      'websockets/binary'
    ]
  }
};
