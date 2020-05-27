const crypto = require('crypto');
const db = require('../../../../database');

class Compositions {
  static get(hash) {
    const queryString = `
      SELECT * FROM compositions
      WHERE hash = $1
      ORDER BY edit_id DESC
      LIMIT 1;
    `;

    return new Promise((resolve, reject) => {
      db.query(queryString, [hash])
        .then(([result]) => {
          resolve(result);
        })
        .catch(reject);
    });
  }

  static async create(title = 'Untitled Composition') {
    const lastIdQuery = `
      SELECT id FROM compositions
      ORDER BY id desc
      LIMIT 1;
    `;

    const [currentId] = await db.query(lastIdQuery);
    const nextId = currentId ? currentId.id + 1 : 1;

    const queryString = `
      INSERT INTO compositions (title, hash, version) 
      VALUES ($1, $2, $3);
    `;

    const hash = crypto.createHash('md5').update(nextId.toString()).digest('hex');

    return new Promise((resolve, reject) => {
      db.query(queryString, [title, hash, 0])
        .then(() => resolve(hash))
        .catch(reject);
    });
  }

  static changeVersion(hash, interval) {
    const queryString = `
      UPDATE compositions
        SET version = version + $2
      WHERE hash = $1;
    `;

    return db.query(queryString, [hash, interval]);
  }
}

module.exports = Compositions;
