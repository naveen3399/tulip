const { initModels } = require("../models/adminapp/init-models");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

let models = initModels(adminDBConnection);
class SchoolService {
  findAll = async (params) => {
    const school = await models.school.findAll({});
    return school;
  };
  createSchool = async (input) => {
    const uuid = uuidv4();
    const sql = `
    INSERT INTO school (id, name, medium, address)
    VALUES ('${uuid}', '${input.name}', '${input.medium}','${input.address}');
  `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };
}

module.exports = new SchoolService();
