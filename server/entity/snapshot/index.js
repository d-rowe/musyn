const db = require('../../../database');
const edit = require('../edit');
const compileEdits = require('./compile');

class Cache {
  static async get(hash) {
    const getQ = `
      SELECT edit_id, version, score FROM snapshots
      INNER JOIN edits ON edits.id = edit_id
      WHERE edits.composition_id = (
        SELECT id FROM compositions WHERE hash = $1 
      )
      ORDER BY version DESC
      LIMIT 1;
    `;

    return db.query(getQ, [hash])
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

    const insertQ = `
      INSERT INTO snapshots(edit_id, score)
      VALUES ($1, $2);
    `;

    const buildEdits = await edit.getFrom(compositionHash, lastCompiled.version + 1);

    const { editId, score } = compileEdits(lastCompiled.score, buildEdits);
    return db.query(insertQ, [editId, score]);
  }
}

module.exports = Cache;
