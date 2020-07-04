const passport = require('passport');

module.exports = passport.authenticate('github', {
  scope: ['profile'],
});
