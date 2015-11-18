'use strict';

var glob = require('globby');
var path = require('path');

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function(cb) {

    var taskConfig = cfg.tasks[id];

    // Alias the current dir
    var cwd = taskConfig.cwd;

    // Task list
    var tasks = [];

    // Task compiler
    var addTask = function addTask(taskConfig) {

      glob.sync(taskConfig.css.src, {
          cwd: cwd
        })
        .map(function(src) {

          var dest = path.dirname(path.join(cwd, src));

          var task_id = path.join(id, dest);

          var html_cwd = taskConfig.html.cwd || dest;

          var html = glob.sync(taskConfig.html.src, {
              cwd: html_cwd
            })
            .map(function(filename) {
              return path.join(html_cwd, filename);
            });

          cfg.gulp.task(task_id, function() {

            return cfg.gulp.src(src, {
                cwd: cwd
              })
              .pipe(cfg.$.uncss({
                html: html
              }))
              .pipe(cfg.gulp.dest(dest));
          });

          tasks.push(task_id);
        });
    };

    taskConfig.inputs.map(function(input) {
      addTask(input);
    });

    cfg.$.sequence.apply(null, tasks)(cb);
    // FIXME: Bug goes away, bug comes back. Cannot run in parallel.
    // cfg.$.sequence(tasks, cb);
  });
};
