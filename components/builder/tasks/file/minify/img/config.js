'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  cwd: path.join(cfg.dir.source, cfg.dir.images),
  src: [
    cfg.patterns.images
  ],
  options: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{
      removeViewBox: false
    }]
  },
  dest: cfg.dir.dest
};
