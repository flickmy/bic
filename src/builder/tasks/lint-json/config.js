'use strict';

var cfg = require('nconf').get();

module.exports = {
  gulp: {
    src: [
      cfg.patterns.json
    ]
  },
  options: {
    comments: true
  }
};
