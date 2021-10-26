const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require('path');


dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`)
});
const DB = process.env.ADMIN_APP_DB_NAME || "postgres";
const USER = process.env.ADMIN_APP_DB_USER || "postgres";
const PASSWORD = process.env.ADMIN_APP_DB_PASSWORD || "postgres123";
const HOST = process.env.ADMIN_APP_DB_HOST || "localhost";
const DIALECT = process.env.ADMIN_APP_DB_DIALECT || "postgres";
const PORT = process.env.ADMIN_APP_DB_PORT || 5342;

const adminDBConnection = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
});

console.log(DB)
console.log(USER)
console.log(PASSWORD)
console.log(HOST)
console.log(DIALECT)
console.log(PORT)

adminDBConnection
  .authenticate()
  .then(() => {
    console.log("Connection to Admin App DB has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the Admin App database:", err);
  });

module.exports = adminDBConnection;
