const db = require('../../../database');
const buildScore = require('./build');


const createNote = async (uuid, pitch, measure, tick, duration) => {
  const action = 'create';
  await db.insert(uuid, action, pitch, measure, tick, duration);
};

const deleteNote = async (uuid, pitch, measure, tick) => {
  const action = 'delete';
  await db.insert(uuid, action, pitch, measure, tick);
};

const undo = async () => {
  await db.deleteLast();
};

const getEditHistory = async () => {
  const query = 'SELECT * FROM score';
  const result = await db.query(query);
  return result;
};

const get = async () => {
  const editHistory = await getEditHistory();
  return buildScore(editHistory);
};

module.exports = {
  createNote,
  deleteNote,
  get,
  undo,
};
