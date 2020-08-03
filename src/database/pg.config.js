const { Pool } = require('pg');

const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin',
  database: 'devpleno'
});

module.exports = connection;
