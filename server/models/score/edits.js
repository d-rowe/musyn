/* eslint-disable class-methods-use-this */
const db = require('../../../database');

class Edits {
  add(uuid, pitch, measure, start, duration) {
    const queryString = `
      INSERT INTO edits(uuid, action, pitch, measure, start, duration)
      VALUES($1, $2, $3, $4, $5, $6)
    `;

    return new Promise((resolve, reject) => {
      db.query(queryString, [uuid, 'create', pitch, measure, start, duration])
        .then(resolve)
        .catch(reject);
    });
  }

  undo() {
    const queryString = `
      DELETE FROM edits WHERE id in (
        SELECT id
        FROM edits
        ORDER BY id desc
        LIMIT 1
      );
    `;

    return new Promise((resolve, reject) => {
      db.query(queryString)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = new Edits();
