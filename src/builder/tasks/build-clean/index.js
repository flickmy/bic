'use strict';

let del = require('del');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  let src = this.config.local.options.src;

  return (cb) => {

    this.logger.info('Cleaning', src);

    del.sync(src);

    cb();
  };
});
