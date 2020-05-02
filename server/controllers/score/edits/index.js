const db = require('../../../../database');

class Edits {
  static register(uuid, action, pitch, measure, start, duration) {
    const queryString = `
      INSERT INTO edits(uuid, action, pitch, measure, start, duration)
      VALUES($1, $2, $3, $4, $5, $6);
    `;

    return db.query(queryString, [uuid, action, pitch, measure, start, duration]);
  }

  static undo() {
    const queryString = `
      DELETE FROM edits WHERE id in (
        SELECT id
        FROM edits
        ORDER BY id desc
        LIMIT 1
      );
    `;

    return db.query(queryString);
  }

  static get() {
    return db.query('SELECT * FROM edits;');
  }

  static getLastId() {
    return new Promise((resolve, reject) => {
      db.query('SELECT id FROM edits ORDER BY id DESC LIMIT 1;')
        .then(([result]) => resolve(result.id))
        .catch(reject);
    });
  }
}

module.exports = Edits;
