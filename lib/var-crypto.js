'use strict';

var cipher = require('node-cipher');

var filename = {
  DECRYPTED: '.env',
  ENCRYPTED: '.env.cast5'
};

var logger = require('@bicjs/bic-logger').get('var-crypto');

function decrypt(password) {

  cipher.decrypt({
    input: filename.ENCRYPTED,
    output: filename.DECRYPTED,
    password: password,
    key: password // Typo in node-cipher
  }, function() {

    logger.info(filename.ENCRYPTED, 'decrypted to', filename.DECRYPTED);
  });
}

function encrypt(password) {

  cipher.encrypt({
    input: filename.DECRYPTED,
    output: filename.ENCRYPTED,
    password: password,
    key: password // Typo in node-cipher
  }, function() {

    logger.info(filename.DECRYPTED, 'encrypted to', filename.ENCRYPTED);
  });
}

module.exports = {
  decrypt: decrypt,
  encrypt: encrypt
};
