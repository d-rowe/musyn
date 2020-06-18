const crypto = require('crypto');
const db = require('../../../database');

class Compositions {
  static get(hash) {
    const getQ = `
      SELECT * FROM compositions
      WHERE hash = $1
      LIMIT 1;
    `;

    return db.query(getQ, [hash])
      .then(([result]) => {
        if (result) return result;
        throw new Error('No composition found');
      });
  }

  static async create(title = 'Untitled Composition') {
    const lastIdQ = `
      SELECT id FROM compositions
      ORDER BY id desc
      LIMIT 1;
    `;

    const [currentId] = await db.query(lastIdQ);
    const nextId = currentId ? currentId.id + 1 : 1;

    const insertQ = `
      INSERT INTO compositions (title, hash, version) 
      VALUES ($1, $2, $3);
    `;

    const salt = process.env.COMPOSITION_SALT;
    const hash = crypto
      .createHash('md5')
      .update(nextId.toString() + salt)
      .digest('hex')
      .substring(0, 5);

    return db.query(insertQ, [title, hash, 0])
      .then(() => hash);
  }

  static changeVersion(hash, interval) {
    const updateQ = `
      UPDATE compositions
      SET version = version + $2
      WHERE hash = $1;
    `;

    return db.query(updateQ, [hash, interval]);
  }

  static getId(hash) {
    const getIdQ = 'SELECT id FROM compositions WHERE hash = $1;';

    return db.query(getIdQ, [hash])
      .then(([result]) => {
        if (!result || !result.id) {
          throw new Error('No composition found');
        } else {
          return result.id;
        }
      });
  }

  static count() {
    const countQ = `
      SELECT COUNT(*) FROM compositions;
    `;

    return db.query(countQ)
      .then(([result]) => ({ ...result, count: parseInt(result.count, 10) }));
  }
}

module.exports = Compositions;
