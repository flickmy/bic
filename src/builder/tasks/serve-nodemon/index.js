'use strict';

let nodemon = require('nodemon');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return (cb) => {

    let hasStarted = false;

    nodemon(this.config.local)
      .on('start', () => {

        if (!hasStarted) {

          this.logger.info('Nodemon has started');

          hasStarted = true;

          cb();
        }
      });
  };
});
