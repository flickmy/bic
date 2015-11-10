'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.jsonLint(this.config.local.options))
    .pipe(this.$.jsonLint.report((lint, file) => {
      if (!file.success) {
        [
          '******************************************************',
          '      Error : ' + lint.error,
          '         In : ' + file.path,
          '       Line : ' + lint.line,
          '  Character : ' + lint.character,
          '    Stopping process',
          '    Check logs for more information',
          '******************************************************'
        ].map(this.logger.error);

        process.exit(1);
      }
    }));
});
