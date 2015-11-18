'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  // watch: {
  //   cwd: cfg.dir.source
  // },
  gulp: {
    options: {
      base: cfg.dir.source
    },
    src: [

      // Everthing will be copied relative to the 'source' dir.
      path.join(cfg.dir.source, cfg.dir.assets, cfg.patterns.all)
    ],
    dest: cfg.dir.dest
  }
};
