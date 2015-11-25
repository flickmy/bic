'use strict';

var program = require('commander');

/**
 * RunTask Module
 */
var RunTask = require('../lib/run-task');

/**
 * VarCrypto Module
 */
var VarCrypto = require('../lib/var-crypto');

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
  .version('0.0.1')
  .usage('<command> [options]')
  .option('-d, --debug', 'Enable debugging mode')
  .option('-r, --release', 'Package for release');

program
  .command('sequence')
  .alias('s')
  .description('Run sequence of tasks')
  .arguments('<id>')
  .action((id) => {
    runTaskType('sequences', id);
  });

program
  .command('task')
  .alias('t')
  .description('Run individual task')
  .arguments('<id>')
  .action((id) => {
    runTaskType('tasks', id);
  });

program
  .command('decrypt <password>')
  .description('Decrypt local ENV vars')
  .action((password) => {
    VarCrypto.decrypt(password);
  });

program
  .command('encrypt <password>')
  .description('Encrypt local ENV vars')
  .action((password) => {
    VarCrypto.encrypt(password);
  });

program.parse(process.argv);
