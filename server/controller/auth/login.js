const User = require('../../entity/user');

module.exports = (authProvider) => async (accessToken, refreshToken, profile, done) => {
  const authID = profile.id;
  const { displayName } = profile;
  let name;
  if (authProvider === 'github') {
    name = displayName;
  } else if (authProvider === 'google') {
    const { givenName, familyName } = profile.name;
    name = familyName ? `${givenName} ${familyName}` : givenName;
  } else {
    // eslint-disable-next-line no-console
    console.error('Unknown auth provider:', authProvider);
    return;
  }

  User.getByAuthID(authID)
    .then((user) => {
      if (!user) {
        // TODO: Log new user registration
        return User.register(authID, name, displayName, authProvider)
          .then(() => User.getByAuthID(authID));
      }

      // TODO: Log user login
      return user;
    })
    .then((user) => done(null, user))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Error while logging in user:', err);
      done('Error while logging in. Please go back and try again.');
    });
};
