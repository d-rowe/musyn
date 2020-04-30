const db = require('../../../database');
const edits = require('./edits');
const buildScore = require('./build');


const createNote = async (uuid, pitch, measure, tick, duration) => {
  // const action = 'create';
  // await db.insert(uuid, action, pitch, measure, tick, duration);
  await edits.add(uuid, pitch, measure, tick, duration);
};

const deleteNote = async (uuid, pitch, measure, tick) => {
  const action = 'delete';
  await db.insert(uuid, action, pitch, measure, tick);
};

const undo = async () => {
  await edits.undo();
};

const getEditHistory = async () => {
  const query = 'SELECT * FROM edits';
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
