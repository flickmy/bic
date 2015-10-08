'use strict';

var _ = require('lodash');
var bs = require('browser-sync');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];

  var files = [];

  cfg.gulp.task(id, function() {

    bs({
      open: false,
      ghostMode: false,
      notify: false,
      port: 3000,
      ui: {
        port: 3001
      },
      logPrefix: 'browsersync',
      proxy: 'http://localhost:3002',
      files: [
        cfg.dir.dest
      ]
    });

    var reload = _.debounce(function() {

      logger.info('Reloading', files);

      bs.reload(files.splice(0));

    }, taskConfig.debounce || 100);

    this.watch(taskConfig.watch.src, {
      cwd: taskConfig.watch.cwd
    })
    .on('ready', function() {

      logger.info('Watching', taskConfig.watch.src, 'in directory', '\'' + taskConfig.watch.cwd + '\'');
    })
    .on('change', function(event) {

      logger.info('File', event.path, 'was', event.type);

      files.push(event.path);

      reload();
    });

  });
};
