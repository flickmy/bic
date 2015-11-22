'use strict';

var path = require('path');
var gulp = require('gulp');
var nconf = require('nconf');

var logger = require('@bicjs/bic-logger').get('init/runner');

function init() {

  var cfg = nconf.get();

  // Gulp plugins
  var $ = require('gulp-load-plugins')({
    config: path.join(cfg.dir.packageRoot, 'package.json'),
    camelize: true
  });

  /**
   *
   *  TODO: Compare Gulp Run Sequence and Gulp Sequence plugins
   *
   *   Issues:
   *
   *   1. Doesn't associate itself with this `gulp` instance within
   *      sequence tasks even though the reference is being passed in.
   *   2. Suspect it is mangling the sequence models and causing parse
   *      errors on subsequent `watch` change event runs.
   *
   */

  $.sequence.use(gulp);

  nconf.merge({
    $: $,
    gulp: gulp
  });
}

module.exports = {
  init: init
};
