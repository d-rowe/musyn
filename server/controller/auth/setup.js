const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const redirect = require('./redirect');

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, redirect),
);
