const db = require('../../../../database');
const compositions = require('../compositions');

class Edits {
  static async register(uuid, composition, action, pitch, measure, start, duration) {
    const queryString = `
      INSERT INTO edits(uuid, composition_id, action, pitch, measure, start, duration)
      VALUES($1, $2, $3, $4, $5, $6, $7);
    `;

    const compositionId = await compositions.getId(composition);

    return db.query(queryString, [uuid, compositionId, action, pitch, measure, start, duration]);
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
