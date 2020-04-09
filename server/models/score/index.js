const db = require('../../../database');
const buildScore = require('./build');


const createNote = async (uuid, pitch, measure, tick) => {
  const action = 'create';
  await db.insert(uuid, action, pitch, measure, tick);
};

const deleteNote = async (uuid, pitch, measure, tick) => {
  const action = 'delete';
  await db.insert(uuid, action, pitch, measure, tick);
};

const undo = async () => {
  const query = `
  DELETE FROM score WHERE id in (
    SELECT id
    FROM score
    ORDER BY id desc
    LIMIT 1
  )
  `;
  await db.query(query);
};

const getEditHistory = async () => {
  const query = 'SELECT * FROM score';
  const result = await db.query(query);
  return result;
};

const get = async () => {
  const entries = await getEditHistory();
  return buildScore(entries);
};

module.exports = {
  createNote,
  deleteNote,
  get,
  undo,
};
