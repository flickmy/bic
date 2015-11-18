'use strict';

let nconf = require('nconf');

let rename = require('gulp-rename');

let Logger = require('@flickmy/bic-logger');

let watcher = require('../watcher');

let Task = function(activate) {

  let _this = this;

  return (id) => {

    // Assign id
    this.id = id;

    // Assign logger
    this.logger = Logger.get(this.id);

    // Log
    this.logger.info('Initilaizing', this.id);

    // Config
    this.config = {
      global: nconf.get(),
      local: nconf.get().tasks[this.id]
    };

    // Gulp & Plugin($)
    this.$ = this.config.global.$;
    this.gulp = this.config.global.gulp;

    // File source
    let src = this.config.local.gulp && this.config.local.gulp.src ?
      this.config.local.gulp.src : this.config.local.src;

    if (src) {

      // Gulp options
      let options = this.config.local.gulp && this.config.local.gulp.options ?
        this.config.local.gulp.options : {
          cwd: this.config.local.cwd || this.config.global.dir.source
        };

      // File destination
      let dest = this.config.local.gulp && this.config.local.gulp.dest ?
        this.config.local.gulp.dest : this.config.local.dest;

      // Gulp task
      let gulp = this.gulp.task(this.id, () => {

        this.logger.info('Starting', this.id);

        this.stream = this.gulp.src(src, options)
          .pipe(rename((path) => {
            // this.logger.debug('path', path);
            return path;
          }));

        // Activate is a function that _should_ return the Gulp stream
        this.stream = activate.call(this);

        // this.logger.debug('src', src);
        // this.logger.debug('options', options);
        // this.logger.debug('dest', dest);

        // Pipe to destination
        if (dest) {

          this.logger.info('Output', dest);

          this.stream.pipe(this.gulp.dest(dest));
        }

        return this.stream;
      });

      // Gulp watch
      watcher(this.id, this.config, gulp);

    } else {

      // Assuming Gulp wrapper requires a callback

      this.gulp.task(this.id, (cb) => {

        this.logger.info('Starting', this.id);

        activate.call(this)(cb);
      });
    }
  };
};

module.exports = Task;
