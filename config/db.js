const { Pool } = require('pg');
const env = process.env;

const pool = new Pool({
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Database OK!');
});

async function query(text, params) {
  // invocation timestamp for the query method
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    // time elapsed since invocation to execution
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.log('error in query', { text });
    throw error;
  }
}

module.exports = {
  query,
};
