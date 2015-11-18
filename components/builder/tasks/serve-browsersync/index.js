'use strict';

let _ = require('lodash');
let bs = require('browser-sync');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  let files = [];

  let reload = _.debounce(() => {

    this.logger.info('Reloading', files);

    bs.reload(files.splice(0));

  }, this.config.local.debounce || 100);

  return (cb) => {

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
        this.config.global.dir.dest
      ]
    });

    this.task.watch(this.config.local.watch.src, {
        cwd: this.config.local.watch.cwd
      })
      .on('ready', () => {

        this.logger.info('Watching', this.config.local.watch.src, 'in directory', '\'' + this.config.local.watch.cwd + '\'');

        cb();
      })
      .on('change', (event) => {

        this.logger.info('File', event.path, 'was', event.type);

        files.push(event.path);

        reload();
      });
  };
});
