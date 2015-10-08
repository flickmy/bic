'use strict';

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.htmlhint(taskConfig.options))
      .pipe(cfg.$.htmlhint.reporter())
      .pipe(cfg.$.htmlhint.failReporter())
      // .pipe(cfg.$.notify(taskConfig.notify))
    ;
  });
};
