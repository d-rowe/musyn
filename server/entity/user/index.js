const db = require('../../../database');

class User {
  static register(displayName, givenName, familyName, authID, provider) {
    const query = `
      INSERT INTO users (
        display_name, given_name, family_name, auth_id, auth_provider_id
      ) VALUES ($1, $2, $3, $4, (SELECT id FROM auth_providers WHERE name = $5 LIMIT 1));
    `;

    return db.query(
      query,
      [displayName, givenName, familyName, authID, provider],
    );
  }

  static get(userID) {
    const query = `
      SELECT * FROM USERS
      WHERE id = $1
    `;

    return db.query(query, [userID])
      .then(([user]) => user);
  }

  static getByAuthID(authID) {
    const query = `
      SELECT * FROM users
      WHERE auth_id = $1
      LIMIT 1;
    `;

    return db.query(query, [authID])
      .then(([user]) => user);
  }
}

module.exports = User;
