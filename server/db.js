const {Pool} = require('pg');

const pool = new Pool({
  user: 'egormaksimov',
  password: '1432',
  host: "localhost",
  port: 5432,
  database: 'instagram'
});
module.exports = pool;