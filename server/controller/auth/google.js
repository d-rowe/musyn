const passport = require('passport');

module.exports = {
  authenticate: passport.authenticate('google', {
    scope: ['profile'],
  }),
  middleware: passport.authenticate('google'),
  redirect: (req, res) => res.redirect('/profile'),
};
