'use strict';

var cipher = require('node-cipher');

var filename = {
  DECRYPTED: '.env',
  ENCRYPTED: '.env.cast5'
};

var logger = require('@flickmy/bic-logger').get('var-crypto');

function decrypt() {

  cipher.decrypt({
    input: filename.ENCRYPTED,
    output: filename.DECRYPTED
  }, function() {

    logger.info(filename.ENCRYPTED, 'decrypted to', filename.DECRYPTED);
  });
}

function encrypt() {

  cipher.encrypt({
    input: filename.DECRYPTED,
    output: filename.ENCRYPTED
  }, function() {

    logger.info(filename.DECRYPTED, 'encrypted to', filename.ENCRYPTED);
  });
}

module.exports = {
  decrypt: decrypt,
  encrypt: encrypt
};
