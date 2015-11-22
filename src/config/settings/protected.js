'use strict';

var path = require('path');
var cfg = require('nconf').get();

// *Should not* be overridden

module.exports = {

  watch: cfg.release === true ? false : true,

  envType: {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production'
  },

  patterns: {
    all: '**/*',
    js: '**/*.js',
    css: '**/*.css',
    json: '**/*.json',
    jade: '**/*.jade',
    html: '**/*.html',
    templates: '**/*.jade',
    sass: '**/*.{scss,sass}',
    svg: '**/*.svg', // Separate SVG in case it is used as a font & image format
    fonts: '**/*.{ttf,eot,svg,woff,woff2}', // TODO: See if `woff[0-9]?` font globbing pattern works
    images: '**/*.{jpe?g,png,gif}',
    ignore: function ignore(pattern, dir) {
      return '!' + path.join((dir || ''), pattern);
    }
  },

  // TODO: Override these if the "rc" file values are defined
  packages: {
    node: 'node_modules',
    local: 'local_modules',
    bower: 'bower_components'
  },

  separators: {
    FILEPATH: '/',
    COMMAND: ':'
  }
};
