const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../../entity/user');

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, async (accessToken, refreshToken, profile, done) => {
    const {
      id,
      displayName,
      name: {
        givenName, familyName,
      },
    } = profile;

    const hasPrevRegistered = await User.exists('google', id);

    if (!hasPrevRegistered) {
      // eslint-disable-next-line no-console
      console.log('Registering', displayName);
      await User.register(displayName, givenName, familyName, id, 'google');
    } else {
      // eslint-disable-next-line no-console
      console.log(displayName, 'already registered');
    }

    done();
  }),
);
