const google = require('./google');
const github = require('./github');

module.exports = {
  login: (req, res) => {
    res.send('Login page');
  },
  logout: (req, res) => {
    res.send('Logging out');
  },
  google,
  github,
};
