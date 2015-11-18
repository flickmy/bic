'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  inputs: [{
    html: {
      cwd: cfg.dir.dest,
      src: [
        cfg.patterns.html
      ]
    },
    css: {
      src: [
        path.join(cfg.dir.common, cfg.patterns.css),
        path.join(cfg.dir.vendor, cfg.patterns.css)
      ]
    }
  }, {
    // Page level
    html: {
      // if no 'cwd:' defined, glob pattern is confined to root dir of css file
      src: [
        // FIXME: Not sure what this is doing anymore... Is there a better way?
        '*.html'
      ]
    },
    css: {
      src: [
        cfg.patterns.css,
        cfg.patterns.ignore(path.join(cfg.dir.common, cfg.patterns.css)),
        cfg.patterns.ignore(path.join(cfg.dir.vendor, cfg.patterns.css))
      ]
    }
  }]
};
