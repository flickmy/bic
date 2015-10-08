'use strict';

var nodemon = require('nodemon');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];

  cfg.gulp.task(id, function(cb) {

    var isActive = false;

    return nodemon(taskConfig)
      .on('start', function() {

        if (!isActive) {

          logger.info('Nodemon is active');

          isActive = true;

          cb();
        }
      });

  });
};
