/* eslint-disable class-methods-use-this */
const db = require('../../../../database');

class Edits {
  register(uuid, action, pitch, measure, start, duration) {
    const queryString = `
      INSERT INTO edits(uuid, action, pitch, measure, start, duration)
      VALUES($1, $2, $3, $4, $5, $6)
    `;

    return db.query(queryString, [uuid, action, pitch, measure, start, duration]);
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

    return db.query(queryString);
  }


  get() {
    return db.query('SELECT * FROM edits');
  }
}

module.exports = new Edits();
