const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'taskflow',
  password: process.env.DB_PASSWORD || '11.11',
  port: process.env.DB_PORT || 5432,
});

pool.on('error', err => console.error('Unexpected error on idle client', err));

pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✓ Connected to PostgreSQL database');
  }
});

module.exports = pool;
