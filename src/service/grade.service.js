const { initModels } = require("../models/adminapp/init-models");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

let models = initModels(adminDBConnection);
class GradeService {
  findAllGrades = async (params) => {
    const grades = await models.grade.findAll({});
    return grades;
  };
  createGrade = async (input) => {
    const uuid = uuidv4();
    const sql = `
    INSERT INTO grade (id, grade, school_id, display_order)
    VALUES ( '${uuid}','${input.grade}', '${input.school_id}','${
      input.display_order
    }');
  `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };
  findBySchoolId = async (params) => {
    const grades = await models.grade.findAll({
      where: { school_id: params["schoolId"] },
      order: [["display_order", "ASC"]],
      attributes: ["id", "grade", "school_id", "display_order"],
      offset: params["offset"],
      limit: params["size"],
    });
    return grades;
  };
}

module.exports = new GradeService();
