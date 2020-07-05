const db = require('../../../database');

class User {
  static register(authID, name, displayName, provider) {
    const query = `
      INSERT INTO users (auth_id, name, display_name, auth_provider_id)
      VALUES ($1, $2, $3, (SELECT id FROM auth_providers WHERE name = $4 LIMIT 1));
    `;

    return db.query(
      query,
      [authID, name, displayName, provider],
    );
  }

  static get(userID) {
    const query = `
      SELECT * FROM USERS
      WHERE id = $1;
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
