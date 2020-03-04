const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
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
