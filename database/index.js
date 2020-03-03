/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'musync',
  database: 'musync',
});

const query = async (queryStr, values) => {
  const client = await pool.connect();
  const result = await client.query(queryStr, values);
  client.release();
  return result.rows;
};

module.exports = {
  query,
};
