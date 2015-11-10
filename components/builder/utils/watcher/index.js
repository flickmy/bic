'use strict';

var _ = require('lodash');

function addWatcher(id, cwd, src, stream) {

  var logger = require('@flickmy/bic-logger').get(id);

  stream.watch(src, {
      cwd: cwd
    }, [id])
    .on('ready', function() {

      logger.info('Watching', src, 'in directory', '\'' + cwd + '\'');
    })
    .on('change', function(event) {

      logger.info('File', event.path, 'was', event.type);
      logger.info('Running', id);
    });
}

module.exports = function(id, cfg, stream) {

  let taskConfig = cfg.tasks[id];

  if (cfg.watch && taskConfig.watch && taskConfig.isWatching !== true) {

    taskConfig.isWatching = true;

    let cwd = taskConfig.watch.cwd || taskConfig.cwd;
    let src = taskConfig.watch.src || taskConfig.src;

    (_.isArray(cwd) ? cwd : [cwd]).map(function(dir) {

      addWatcher(id, dir, src, stream);

    });
  }
};
