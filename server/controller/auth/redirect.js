const User = require('../../entity/user');

module.exports = async (accessToken, refreshToken, profile, done) => {
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
};
