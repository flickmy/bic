'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  watch: true,
  base: cfg.dir.source,
  cwd: path.join(cfg.dir.source, cfg.dir.assets),
  src: [

    // Everthing will be copied relative to the 'source' dir.
    path.join(cfg.dir.source, cfg.dir.assets, cfg.patterns.all)
  ],
  dest: cfg.dir.dest
};
