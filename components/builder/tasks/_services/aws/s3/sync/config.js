'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.all
  ],
  options: cfg.plugins.s3.options,
  force: cfg.forceDeploy === true || false
};
