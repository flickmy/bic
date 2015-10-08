'use strict';

module.exports = function(id, cfg) {

  var taskConfig = cfg.tasks[id];

  cfg.gulp.task(id, function() {

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.svgSprite(taskConfig.options))
      .pipe(cfg.gulp.dest(taskConfig.dest));
  });
};
