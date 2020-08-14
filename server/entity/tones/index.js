const fs = require('fs');
const paths = require('../../../config/paths');

module.exports.getTones = function (cb) {
  let tones = [];
  fs.readdir(paths.instruments, (err,files)=> {
    if (err) {
      console.log(err, null);
      cb(err);
    }else{
      files.forEach((file)=>{
        tones.push(file.slice(0,-4));
      });
      cb(null,tones);
    }
  });
}

