const passport = require('passport');

module.exports = {
  authenticate: passport.authenticate('google', {
    scope: ['profile'],
  }),
  redirect: [
    passport.authenticate('google'),
    (req, res) => res.send('Callback URI'),
  ],
};
