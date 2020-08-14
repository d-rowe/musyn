const fs = require('fs');
const paths = require('../../../config/paths');

module.exports.getTones = function (cb) {
  const tones = [];
  fs.readdir(paths.instruments, (err, files) => {
    if (err) {
      cb(err, null);
    } else {
      files.forEach((file) => {
        tones.push(file.slice(0, -4));
      });
      cb(null, tones);
    }
  });
};
