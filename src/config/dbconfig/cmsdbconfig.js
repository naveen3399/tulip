const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `../../${process.env.NODE_ENV}.env`)
});
const DB = process.env.CMS_DB_NAME || "drupal";
const USER = process.env.CMS_DB_USER || "root";
const PASSWORD = process.env.CMS_DB_PASSWORD || "Satvik@1203";
const HOST = process.env.CMS_DB_HOST || "localhost";
const DIALECT = process.env.CMS_DB_DIALECT || "mysql";
const PORT = process.env.CMS_DB_PORT || 3306;

const cmsDBConnection = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
});


cmsDBConnection
  .authenticate()
  .then(() => {
    console.log("Connection to CMS DB has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the CMS database:", err);
  });

module.exports = cmsDBConnection; 
