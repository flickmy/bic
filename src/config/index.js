'use strict';

var _ = require('lodash');
var nconf = require('nconf');
var path = require('path');
var projectRoot = process.cwd();

// Logger
var Logger = require('@bicjs/bic-logger');

var logger = Logger.get('config');

// Export for reference
module.exports = {

  init: function init() {

    // Load (ignored) `.env` vars for local development
    require('dotenv').config({
      silent: true
    });

    // Init Nconf
    nconf
      .use('memory')
      .argv()
      .env();

    // Set log level
    let logLevel = nconf.get('debug') === true ? Logger.Levels.DEBUG : Logger.Levels.ERROR;

    Logger.setLevel(logLevel);

    // Protected config data - *Cannot* be overridden
    nconf.overrides(require('./settings/protected'));

    // Ensure the env is valid
    var ENV = nconf.get('ENV');
    var envType = nconf.get('envType');
    var envDefault = envType.DEVELOPMENT;

    if (!_.includes(envType, ENV)) {
      [
        '******************************************************',
        '  Warning:',
        '    Invalid \'ENV\' value \'' + ENV + '\'',
        '    Defaulting to \'' + envDefault + '\'',
        '******************************************************'
      ].map(function(msg) {

        logger.warn(msg);

      });

      nconf.set('ENV', envDefault);

    } else {

      logger.info('Valid enviroment detected:', ENV);
    }

    // Default config data - Can be overriden
    nconf.defaults(require('./settings/default'));

    // Override Default data with Environment data - Sets flags for Project config data
    nconf.merge(require('./settings/env/' + nconf.get('ENV')));

    // Override Default data with Project data
    nconf.merge(require(path.join(projectRoot, 'bic.config'))(nconf.get()));

    return this;
  },

  getAll: function() {

    return nconf.get();
  },

  getValue: function(key) {

    return nconf.get(key);
  },

  setValue: function(key, val) {

    nconf.merge(key, val);

    return this;
  },

  setProtected: function(obj) {

    nconf.overrides(obj);

    return this;
  },

  setDefault: function(obj) {

    nconf.defaults(obj);

    return this;
  },

  setOverride: function(obj) {

    nconf.merge(obj);

    return this;
  }
};
