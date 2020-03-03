const db = require('../../../database/index');
const buildScore = require('./build');

const queryTemplate = `
INSERT INTO score(uuid, action, notename, beat)
VALUES($1, $2, $3, $4)
`;

const createNote = async ({ uuid, notename, beatIndex }) => {
  const action = 'create';
  const values = [uuid, action, notename, beatIndex];
  await db.query(queryTemplate, values);
};

const deleteNote = async ({ uuid, notename, beatIndex }) => {
  const action = 'delete';
  const values = [uuid, action, notename, beatIndex];
  await db.query(queryTemplate, values);
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

module.exports = { createNote, deleteNote, get };
