require('./setup');
const authCheck = require('./authCheck');
const google = require('./google');

module.exports = {
  login: (req, res) => {
    res.send('Login page');
  },
  logout: (req, res) => {
    res.send('Logging out');
  },
  authCheck,
  google,
};
