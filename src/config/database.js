// const { Client } = require("pg");

// const client = new Client({
//   host: process.env.PGHOST || "localhost",
//   user: process.env.PGUSER || "postgres",
//   port: process.env.PGPORT || 5432,
//   password: process.env.PGPASSWORD || "123456",
//   database: process.env.PGDB || "northbay_db"
// });

// module.exports = client;

const Sequelize = require("sequelize");
// import * as pg from "pg";
const pg = require("pg");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialectModule: pg,
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT
});

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();
// console.log(sequelize);

let getSequelize = () => {
  return sequelize;
};
module.exports = getSequelize; //Why not module.exports = sequelize
