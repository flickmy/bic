'use strict';

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function(cb) {

    var logger = require('@bicjs/bic-logger').get(id);

    var taskConfig = cfg.tasks[id];

    if (taskConfig.skip) {

      logger.warn('No CloudFront distribution detected');

      cb();

    } else {

      cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.cloudfront(taskConfig.options))
      .on('finish', cb);
    }

  });
};
