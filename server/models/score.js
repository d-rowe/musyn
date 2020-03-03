const db = require('../../database/index');

const addNote = async ({ uuid, notename, beatIndex }) => {
  const query = 'INSERT INTO score(uuid, notename, beat) VALUES($1, $2, $3)';
  const values = [uuid, notename, beatIndex];
  await db.query(query, values);
};

const getEditHistory = async () => {
  const query = 'SELECT * FROM score';
  const result = await db.query(query);
  return result;
};

module.exports = { addNote, getEditHistory };
