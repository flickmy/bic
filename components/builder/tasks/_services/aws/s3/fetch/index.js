'use strict';

var rek = require('rekuire');

var aws = rek('libs/services/aws');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];

  cfg.gulp.task(id, function(cb) {

    logger.info('Downloading', taskConfig.path.remote);

    aws.downloadBuffer(taskConfig.path.remote)
      .then(function(response) {

        taskConfig.callback(null, response);

        cb();

      })
      .catch(function(err) {

        taskConfig.callback(err);
      });
  });
};
