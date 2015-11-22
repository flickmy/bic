'use strict';

var cfg = require('nconf').get();

module.exports = {
  options: cfg.plugins.s3.options
};
