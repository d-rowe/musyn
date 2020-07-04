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

  static exists(provider, authID) {
    const query = `
      SELECT id FROM users
      WHERE auth_provider_id = (SELECT id FROM auth_providers WHERE name = $1 LIMIT 1)
      AND auth_id = $2;
    `;

    return db.query(query, [provider, authID])
      .then(([results]) => results !== undefined);
  }
}

module.exports = User;
