const db = require('../../../database');

class Edit {
  static async register(uuid, compositionId, action, pitch, measure, start, duration, tone1) {
    const versionQ = `
      SELECT ROW_NUMBER() OVER(PARTITION BY composition_id)
      FROM edits WHERE composition_id = $1 ORDER BY id DESC LIMIT 1;
    `;

    const [lastVersionResult] = await db.query(versionQ, [compositionId]);
    const version = lastVersionResult
      ? parseInt(lastVersionResult.row_number, 10) + 1
      : 1;

    const insertQ = `
      INSERT INTO edits(uuid, composition_id, version, action, pitch, measure, start, duration, tone1)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    return db.query(
      insertQ,
      [
        uuid,
        compositionId,
        version,
        action,
        pitch,
        measure,
        start,
        duration,
        tone1,
      ],
    );
  }

  static undo(composition) {
    const undoQ = `
      DELETE FROM edits WHERE id in (
        SELECT id
        FROM edits
        WHERE composition_id = (
          SELECT id FROM compositions WHERE hash = $1
        )
        ORDER BY id DESC
        LIMIT 1
      );
    `;

    return db.query(undoQ, [composition]);
  }

  static getFrom(compositionId, startVersion) {
    const newEditsQ = `
      SELECT * FROM edits
      WHERE composition_id = $1
      AND version >= $2
      ORDER BY version ASC;
    `;

    return db.query(newEditsQ, [compositionId, startVersion]);
  }

  static async getAll() {
    const getQ = `
      SELECT * FROM edits;
    `;

    const editHistory = await db.query(getQ);
    return editHistory;
  }

  static async getLastId() {
    const lastQ = 'SELECT id FROM edits ORDER BY id DESC LIMIT 1;';
    const [result] = await db.query(lastQ);
    return result.id;
  }
}

module.exports = Edit;
