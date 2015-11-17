'use strict';

module.exports = [
  'tasks/file-clean', [
    'sequences/lint',
    'sequences/style',
    'tasks/file/svg',
    'tasks/file/copy'
  ],
  'tasks/process/webpack',
  'tasks/process/modernizr'
];
