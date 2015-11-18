'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  gulp: {
    options: {
      cwd: path.join(cfg.dir.source, cfg.dir.images)
    },
    src: [
      cfg.patterns.images
    ],
    dest: cfg.dir.dest
  },
  options: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{
      removeViewBox: false
    }]
  }
};
