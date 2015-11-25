'use strict';

let _ = require('lodash');

module.exports = function(id, cfg) {

  let logger = require('@bicjs/bic-logger').get('utils/sequencer');

  logger.debug('Activating Sequence', id);

  cfg.gulp.task(id, function(cb) {

    /**
     * FIXME: Something is mutating the parallel task string values into object literals... Maybe the sequence task?
     */

    let sequenceConfig = _.cloneDeep(cfg.sequences[id]);

    logger.debug('Executing Sequence', id, sequenceConfig.sequence);

    /**
     * TODO: Might be beneficial to have a `sequenceConfig.bootstrap(id, cfg) { ... }` to set some pre-sequence params
     */

    cfg.$.sequence.apply(null, sequenceConfig.sequence)(cb);
  });
};
