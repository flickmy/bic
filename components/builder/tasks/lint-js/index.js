'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.jshint(this.config.local.options))
    .pipe(this.$.jshint.reporter(this.config.local.reporter))
    .pipe(this.$.jshint.reporter('fail'))
    .on('error', (error) => {

      [
        '******************************************************',
        '  ' + error.message,
        '    Stopping process',
        '    Check logs for more information',
        '******************************************************'
      ].map((line) => {
        this.logger.error(line);
      });

      process.exit(1);
    });
});
