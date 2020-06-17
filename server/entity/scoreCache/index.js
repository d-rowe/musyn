const db = require('../../../database');
const edits = require('../edits');
const compileEdits = require('./compile');

class Cache {
  static async get(hash) {
    const query = `
      SELECT edit_id, version, score FROM score_cache
      INNER JOIN edits ON edits.id = edit_id
      WHERE edits.composition_id = (
        SELECT id FROM compositions WHERE hash = $1 
      )
      ORDER BY version DESC
      LIMIT 1;
    `;

    return db.query(query, [hash])
      .then(([result]) => {
        let editId = 0;
        let version = 0;
        let score = {};
        if (result) {
          version = result.version || 0;
          editId = result.edit_id || 0;
          score = result.score || {};
        }

        return { editId, version, score };
      });
  }

  static async update(compositionHash) {
    const lastCompiled = await this.get();

    const queryString = `
      INSERT INTO score_cache(edit_id, score)
      VALUES ($1, $2);
    `;

    const buildEdits = await edits.getFrom(compositionHash, lastCompiled.version + 1);

    const { editId, score } = compileEdits(lastCompiled.score, buildEdits);
    return db.query(queryString, [editId, score]);
  }

  static undo() {
    const queryString = `
      DELETE FROM score_cache WHERE edit_id in (
        SELECT edit_id
        FROM score_cache
        ORDER BY edit_id DESC
        LIMIT 1
      );
    `;

    return db.query(queryString);
  }
}

module.exports = Cache;
