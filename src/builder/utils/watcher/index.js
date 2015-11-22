'use strict';

let _ = require('lodash');

function addWatcher(id, cwd, src, gulp) {

  let logger = require('@bicjs/bic-logger').get(id);

  gulp.watch(src, {
      cwd: cwd
    }, [id])
    .on('ready', () => {

      logger.info('Watching', src, 'in directory', '\'' + cwd + '\'');
    })
    .on('change', (event) => {

      logger.info('File', event.path, 'was', event.type);
      logger.info('Running', id);
    });
}

module.exports = (id, cfg, gulp) => {

  if (cfg.global.watch && cfg.local.watch && cfg.local.isWatching !== true) {

    cfg.local.isWatching = true;

    let cwd = cfg.local.watch.cwd || cfg.local.gulp.cwd;
    let src = cfg.local.watch.src || cfg.local.gulp.src;

    (_.isArray(cwd) ? cwd : [cwd]).map((dir) => {

      addWatcher(id, dir, src, gulp);

    });
  }
};
