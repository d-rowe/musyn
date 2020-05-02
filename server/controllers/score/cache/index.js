const db = require('../../../../database');
const edits = require('../edits');
const Note = require('../../../../lib/note');

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

  // TODO: Split build out, handle overwrites
  static async update() {
    const { editId, score } = await this.get();
    const newScore = { ...score };

    const buildEdits = await edits.getFrom(editId + 1);

    let lastId;
    buildEdits.forEach((edit) => {
      lastId = edit.id;
      const {
        action,
        pitch,
        measure,
        start,
        duration,
        uuid,
      } = edit;

      if (action === 'create') {
        const startInt = parseInt(start, 10);
        const measureInt = parseInt(measure, 10);
        const durationInt = parseInt(duration, 10);

        const note = new Note({
          pitch,
          start: startInt,
          measure: measureInt,
          duration: durationInt,
          author: uuid,
        });

        if (newScore[measure] === undefined) {
          newScore[measure] = { [start]: note };
          return;
        }

        newScore[measure][start] = note;
      }

      if (action === 'delete') {
        if (newScore[measure] === undefined) return;

        if (newScore[measure][start] === undefined) return;

        delete newScore[measure][start];

        if (newScore[measure] === undefined) {
          delete newScore[measure];
        }
      }
    });

    const queryString = `
      INSERT INTO scores(edit_id, data)
      VALUES ($1, $2);
    `;

    return db.query(queryString, [lastId, newScore]);
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
