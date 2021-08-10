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
const sequelize = new Sequelize("northbay_db", "postgres", "123456", {
  dialectModule: pg,
  dialect: "postgres",
  host: "localhost"
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
