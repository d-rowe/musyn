const crypto = require('crypto');
const db = require('../../../../database');

class Compositions {
  static get(hash) {
    const queryString = `
      SELECT * FROM compositions
      WHERE hash = $1
      LIMIT 1;
    `;

    return db.query(queryString, [hash])
      .then(([result]) => {
        if (result) return result;
        throw new Error('No composition found');
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

    const hash = crypto
      .createHash('md5')
      .update(nextId.toString())
      .digest('hex');

    return db.query(queryString, [title, hash, 0])
      .then(() => hash);
  }

  static changeVersion(hash, interval) {
    const queryString = `
      UPDATE compositions
        SET version = version + $2
      WHERE hash = $1;
    `;

    return db.query(queryString, [hash, interval]);
  }

  static getId(hash) {
    const queryString = 'SELECT id FROM compositions WHERE hash = $1;';

    return db.query(queryString, [hash])
      .then(([result]) => {
        if (!result || !result.id) {
          throw new Error('No composition found');
        } else {
          return result.id;
        }
      });
  }
}

module.exports = Compositions;
