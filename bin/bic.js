#!/usr/bin/env node

'use strict';

var program = require('commander');

// Commands

/**
 * RunTask Module
 */
var RunTask = require('./commands/run-task');

/**
 * VarCrypto Module
 */
var VarCrypto = require('./commands/var-crypto');

/**
 * Lazy initilaizes `RunTask` module executes tasks or sequences
 * @param  {string} type Can be "task" or "sequence"
 * @param  {string} id   Id of task or sequence
 */
function runTaskType(type, id) {
  RunTask.init();
  RunTask.exec(type, id);
}

program
  .command('sequence [id]')
  .description('Run a sequence of tasks')
  .option('-r, --release', 'Package for release')
  .action(function(id) {
    runTaskType('sequences', id);
  });

program
  .command('task [id]')
  .description('Run an individual task')
  .action(function(id) {
    runTaskType('tasks', id);
  });

program
  .command('decrypt [password]')
  .description('Decrypt local ENV vars')
  .action(function(password) {
    VarCrypto.decrypt(password);
  });

program
  .command('encrypt [password]')
  .description('Encrypt local ENV vars')
  .action(function(password) {
    VarCrypto.encrypt(password);
  });

program.parse(process.argv);
