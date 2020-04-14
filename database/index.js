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

const insert = async (uuid, action, pitch, measure, start, duration) => {
  const queryString = `
    INSERT INTO score(uuid, action, pitch, measure, start, duration)
    VALUES($1, $2, $3, $4, $5, $6)
  `;

  await query(queryString, [uuid, action, pitch, measure, start, duration]);
};

const deleteLast = async () => {
  const queryString = `
  DELETE FROM score WHERE id in (
    SELECT id
    FROM score
    ORDER BY id desc
    LIMIT 1
  )
  `;

  query(queryString);
};

module.exports = {
  query,
  insert,
  deleteLast,
};
