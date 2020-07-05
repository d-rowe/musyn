const User = require('../../entity/user');

module.exports = async (accessToken, refreshToken, profile, done) => {
  const {
    id: authID,
    displayName,
    name: {
      givenName, familyName,
    },
  } = profile;

  User.getByAuthID(authID)
    .then((user) => {
      if (!user) {
        // TODO: Log new user registration
        return User.register(displayName, givenName, familyName, authID, 'google')
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
