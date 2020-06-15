const db = require('../../../../database');

class Edits {
  static async register(uuid, compositionId, action, pitch, measure, start, duration) {
    const versionQuery = `
      SELECT ROW_NUMBER() OVER(PARTITION BY composition_id)
      FROM edits WHERE composition_id = $1 ORDER BY id DESC LIMIT 1;
    `;

    const [lastVersionResult] = await db.query(versionQuery, [compositionId]);
    const version = lastVersionResult
      ? parseInt(lastVersionResult.row_number, 10) + 1
      : 1;

    const insertQuery = `
      INSERT INTO edits(uuid, composition_id, version, action, pitch, measure, start, duration)
      VALUES(
        $1, 
        $2,
        $3, 
        $4, 
        $5, 
        $6, 
        $7,
        $8
      );
    `;

    return db.query(
      insertQuery,
      [
        uuid,
        compositionId,
        version,
        action,
        pitch,
        measure,
        start,
        duration,
      ],
    );
  }

  static undo() {
    const query = `
      DELETE FROM edits WHERE id in (
        SELECT id
        FROM edits
        ORDER BY id DESC
        LIMIT 1
      );
    `;

    return db.query(query);
  }

  static async getFrom(compositionId, startId) {
    const query = `
      SELECT * FROM edits WHERE id >= $1 AND composition_id = $2;
    `;

    const results = await db.query(query, [startId, compositionId]);
    return results;
  }

  static async getAll() {
    const query = `
      SELECT * FROM edits;
    `;

    const editHistory = await db.query(query);
    return editHistory;
  }

  static async getLastId() {
    const [result] = await db.query('SELECT id FROM edits ORDER BY id DESC LIMIT 1;');
    return result.id;
  }
}

module.exports = Edits;
