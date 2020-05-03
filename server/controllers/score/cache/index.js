const db = require('../../../../database');
const edits = require('../edits');
const compileEdits = require('./compile');

class Cache {
  static get() {
    const queryString = `
      SELECT edit_id, data FROM scores
      ORDER BY edit_id DESC
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      db.query(queryString)
        .then(([result]) => {
          let editId;
          let score;
          if (result) {
            editId = result.edit_id;
            score = result.data;
          } else {
            editId = 0;
            score = {};
          }

          resolve({ editId, score });
        })
        .catch(reject);
    });
  }

  static async update() {
    const lastCompiled = await this.get();
    const buildEdits = await edits.getFrom(lastCompiled.editId + 1);

    const queryString = `
      INSERT INTO scores(edit_id, data)
      VALUES ($1, $2);
    `;

    const { editId, score } = compileEdits(lastCompiled.score, buildEdits);
    return db.query(queryString, [editId, score]);
  }

  static undo() {
    const queryString = `
      DELETE FROM scores WHERE edit_id in (
        SELECT edit_id
        FROM scores
        ORDER BY edit_id DESC
        LIMIT 1
      );
    `;

    return db.query(queryString);
  }
}

module.exports = Cache;
