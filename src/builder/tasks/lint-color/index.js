'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.colorguard(this.config.local.options))
    .on('error', (error) => {

      let msg = error.message;

      [
        '******************************************************',
        '    Error : ' + msg.substring(msg.indexOf(':') + 2),
        '       In : ' + msg.substring(0, msg.indexOf(':')),
        '    Stopping process',
        '    Check logs for more information',
        '******************************************************'
      ].map((line) => {
        this.logger.error(line);
      });

      process.exit(1);
    });
});
