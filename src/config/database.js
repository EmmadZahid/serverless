const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "postgres",
  port: process.env.PGPORT || 5432,
  password: process.env.PGPASSWORD || "123456",
  database: process.env.PGDB || "northbay_db"
});

module.exports = client;
