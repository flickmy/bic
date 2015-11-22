'use strict';

var path = require('path');

// Logger
var logger = require('@bicjs/bic-logger').get('Bic');

// Bic
var bic = require('../index.js');

// Config
var cfg;

var isInitilaized = false;

function init() {

  if (isInitilaized === false) {

    isInitilaized = true;

    bic.config.init();
    bic.builder.init();

    cfg = bic.config.getAll();
  }
}

function list(type) {

  logger.info(':::', 'Available', type, ':::');

  Object.keys(cfg[type]).map(function(id) {

    logger.info(' - ', path.relative(type, id));
  });
}

function exec(type, id) {

  if (id) {

    var name = path.join(type, id);

    if (cfg[type][name]) {

      bic.builder.exec(name);

    } else {

      logger.error('!!!', 'Cannot find', id);

      list(type);
    }

  } else {

    list(type);
  }
}

module.exports = {
  init: init,
  exec: exec
};
