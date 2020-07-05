const passport = require('passport');

module.exports = {
  authenticate: passport.authenticate('github', {
    scope: ['user'],
  }),
  middleware: passport.authenticate('github'),
  redirect: (req, res) => res.redirect('/'),
};
