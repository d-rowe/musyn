const path = require('path');

const currentDir = process.env.PWD;

module.exports = {
  audio: path.join(__dirname, '../client/public/assets/audio/'),
  image: '/assets/img/instruments/',
  instruments: path.join(__dirname, '../client/public/assets/img/instruments/'),
};
