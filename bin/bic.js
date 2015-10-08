#!/usr/bin/env node

'use strict';

var program = require('commander');

// Commands

/**
 * RunTask Module
 * @param  {String} './commands/run-task' Module path
 * @return {RunTask}                      Module class
 */
var RunTask = require('./commands/run-task');

/**
 * VarCrypto Module
 * @param  {String} './commands/var-crypto' Module path
 * @return {RunTask}                        Module class
 */
var VarCrypto = require('./commands/var-crypto');

/**
 * Lazy initilaizes `RunTask` module executes tasks or sequences
 * @param  {String} type Can be "task" or "sequence"
 * @param  {String} id   Id of task or sequence
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
  .command('decrypt')
  .description('Decrypt local ENV vars')
  .action(VarCrypto.decrypt);

program
  .command('encrypt')
  .description('Encrypt local ENV vars')
  .action(VarCrypto.encrypt);

program.parse(process.argv);
