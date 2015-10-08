'use strict';

module.exports = [
  'tasks/process/clean', [
    'tasks/file/lint/js',
    'tasks/file/style/js',
    'tasks/file/svg',
    'tasks/file/copy'
  ],
  'tasks/process/webpack',
  'tasks/process/modernizr'
];
