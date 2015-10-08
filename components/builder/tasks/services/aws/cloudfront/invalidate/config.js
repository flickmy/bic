'use strict';

var cfg = require('nconf').get();

cfg.plugins.cloudfront.options.credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretKeyId: process.env.AWS_SECRET_ACCESS_KEY
};

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.html
  ],
  skip: cfg.plugins.cloudfront.options.distributionId === undefined ? true : false,
  options: cfg.plugins.cloudfront.options,
  invalidations: {
    CallerReference: Date.now().toString(),
    Paths: {
      Quantity: 0,
      Items: []
    }
  }
};
