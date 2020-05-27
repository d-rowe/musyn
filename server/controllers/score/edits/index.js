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
        ORDER BY id DESC
        LIMIT 1
      );
    `;

    return db.query(queryString);
  }

  static async getFrom(startId) {
    const queryString = `
      SELECT * FROM edits WHERE id >= $1;
    `;

    const results = await db.query(queryString, [startId]);
    return results;
  }

  static async getAll() {
    const queryString = `
      SELECT * FROM edits;
    `;

    const editHistory = await db.query(queryString);
    return editHistory;
  }

  static getLastId() {
    return db.query('SELECT id FROM edits ORDER BY id DESC LIMIT 1;')
      .then(([result]) => result.id);
  }
}

module.exports = Edits;
