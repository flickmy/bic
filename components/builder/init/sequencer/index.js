'use strict';

var nconf = require('nconf');
var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var glob = require('globby');
var traverse = require('traverse');
var rek = require('rekuire');

// Logger
var logger = require('@flickmy/bic-logger').get('init/sequencer');

var sequencer = rek('components/builder/utils/sequencer');

function getDefaultDataObject(sequenceStringOrArray) {

  return {
    is: {
      activated: false
    },
    sequence: sequenceStringOrArray
  };
}

var cwd;
var cfg;

function globCwd(src) {

  return glob.sync(src, {
    cwd: cwd
  });
}

function getFlattenedSequence(sequence) {

  return traverse(sequence)
    .reduce(function(arr, id) {

      if (this.isLeaf) {
        arr.push(id);
      }

      return arr;

    }, []);
}

function init() {

  var id;

  // Add tasks and sequence lookups
  nconf.merge({
    tasks: {},
    sequences: {}
  });

  cfg = nconf.get();

  cwd = path.join(cfg.dir.packageRoot, 'components/builder');

  globCwd('tasks/**/index.js')
    .map(function initTaskNames(filePath) {

      id = path.join(path.dirname(filePath));

      cfg.tasks[id] = getDefaultDataObject(id);
    });

  globCwd('sequences/**/*.js')
    .map(function initSequenceNames(filePath) {

      id = path.join(
        path.dirname(filePath),
        path.basename(filePath, path.extname(filePath))
      );

      var sequence = rek(path.join(cwd, id));

      cfg.sequences[id] = getDefaultDataObject(sequence);
    });
}

function activateSequence(id) {

  logger.debug('Activate Sequence', id);

  var sequence = cfg.sequences[id];

  getFlattenedSequence(sequence.sequence)
    .map(activate);

  if (!sequence.is.activated) {

    sequence.is.activated = true;

    sequencer(id, cfg);
  }
}

function activateTasks(id) {

  logger.debug('Activate Task', id);

  var filePath = path.join(cwd, id);

  var configPath = path.join(filePath, 'config.js');

  if (fs.existsSync(configPath)) {

    cfg.tasks[id] = cfg.tasks[id] || {};

    // FIXME : How deep is your love?
    // Default config will be overridden by project specific tasks configs in `config/tasks.js`
    cfg.tasks[id] = _.merge(require(configPath), cfg.tasks[id]);
  }

  require(filePath)(id, cfg);
}

function run(id) {

  cfg.$.sequence(id)(function onComplete(err) {

    if (err) {

      logger.error(err);

    } else {

      logger.info('Completed', id);
    }

  });
}

function activate(id) {

  if (cfg.tasks[id]) {

    activateTasks(id);

  } else if (cfg.sequences[id]) {

    activateSequence(id);

  } else {

    logger.error('Cannot find sequence or task', id);
  }
}

function exec(id) {

  logger.info('Started', id);

  activate(id);

  run(id);
}

module.exports = {
  init: init,
  exec: exec
};
