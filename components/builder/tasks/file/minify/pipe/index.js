'use strict';

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.foreach(function(stream, file) {
        return stream
          .pipe(cfg.$.pipemin({
            js: function(stream, concat) {
              return stream
                .pipe(concat);
            },
            css: function(stream, concat) {
              return stream
                .pipe(concat);
            }
          }));
      }))

    .pipe(cfg.gulp.dest(taskConfig.dest));
  });
};
