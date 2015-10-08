'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.html
  ],
  skip: cfg.plugins.cloudfront.options.distributionId === undefined ? true : false,
  options: cfg.plugins.cloudfront.options
};
