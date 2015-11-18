'use strict';

var path = require('path');
var glob = require('globby');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];
  var items = [];

  cfg.gulp.task(id, function(cb) {

    if (taskConfig.skip) {

      logger.warn('No CloudFront distribution detected');

      cb();

    } else {

      if (taskConfig.invalidateAll) {

        items = ['/*'];

      } else {

        items = glob.sync(taskConfig.src, {
          cwd: taskConfig.cwd
        })
        .reduce(function(arr, filePath) {

          // Add root relative path
          filePath = path.join('/', filePath);

          arr.push(filePath);

          // Strip file name
          filePath = filePath.substring(0, filePath.lastIndexOf('/') + 1);

          arr.push(filePath);

          // Strip trailing slash
          filePath = filePath.substring(0, filePath.lastIndexOf('/'));

          if (filePath !== '') {
            arr.push(filePath);
          }

          return arr;

        }, []);
      }

      logger.info('Invalidating', items.length, 'items');
      logger.info(items);

      taskConfig.invalidations.Paths = {
        Items: items,
        Quantity: items.length
      };

      cfg.gulp.src(taskConfig.src, {
          cwd: taskConfig.cwd
        })
        .pipe(cfg.$.invalidateCloudfront(taskConfig.invalidations, taskConfig.options))
        .on('finish', cb);
    }

  });
};
