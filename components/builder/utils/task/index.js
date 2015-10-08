'use strict';

var nconf = require('nconf');
var rek = require('rekuire');

var Logger = require('@flickmy/bic-logger');

var watcher = rek('components/builder/utils/watcher');

var Task = function(activate) {

  return (id) => {

    // Assign id
    this.id = id;

    // Assign logger
    this.logger = Logger.get(this.id);

    // Tidy up configs
    var globalConfig = nconf.get();
    var localConfig = globalConfig.tasks[this.id];

    this.config = {
      global: globalConfig,
      local: localConfig
    };

    // Expose Gulp & Plugin($)
    this.$ = globalConfig.$;
    this.gulp = globalConfig.gulp;

    // Say what's up
    this.logger.info('Initilaizing', this.id);

    // Activate is a function that _should_ return the Gulp stream
    var stream = activate.apply(this);

    // So we can do boring things with it
    watcher(this.id, this.config.global, stream);
  };
};

module.exports = Task;
