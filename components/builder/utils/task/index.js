'use strict';

let nconf = require('nconf');

let Logger = require('@flickmy/bic-logger');

let watcher = require('../watcher');

let Task = function(activate) {

  return (id) => {

    // Assign id
    this.id = id;

    // Assign logger
    this.logger = Logger.get(this.id);

    // Tidy up configs
    let globalConfig = nconf.get();
    let localConfig = globalConfig.tasks[this.id];

    this.config = {
      global: globalConfig,
      local: localConfig
    };

    // Expose Gulp & Plugin($)
    this.$ = globalConfig.$;
    this.gulp = globalConfig.gulp;

    // Say what's up
    this.logger.info('Initilaizing', this.id);

    let src = this.config.local.gulp ? this.config.local.gulp.src : null;

    if (src) {

      let options = this.config.local.gulp.options || {
        cwd: this.config.global.dir.source
      };

      this.stream = this.gulp.src(src, options);

      this.gulp.task(this.id, () => {
        return this.stream;
      });

      // Activate is a function that _should_ return the Gulp stream
      activate.apply(this);

      // Send to destination
      if (this.config.local.gulp.dest) {
        this.stream.pipe(this.gulp.dest(this.config.local.gulp.dest));
      }

      // And then we can spy on it
      watcher(this.id, this.config.global, this.stream);

    } else {

      this.gulp.task(this.id, activate.apply(this));
    }
  };
};

module.exports = Task;
