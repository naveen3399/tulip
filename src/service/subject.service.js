const { initModels } = require("../models/adminapp/init-models");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

let models = initModels(adminDBConnection);
class SubjectService {
  findAll = async (params) => {
    const subject = await models.subject.findAll({});
    return subject;
  };
  createSubject = async (input) => {
    const uuid = uuidv4();
    const sql = `
            INSERT INTO subject (id, subject, grade_id, display_order)
            VALUES ( '${uuid}','${input.subject}', 
            '${input.grade_id}','${input.display_order}');
          `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };

  findBygradeId = async (params) => {
    const subject = await models.subject.findAll({
      where: {
        grade_id: params["gradeId"],
      },
      order: [["display_order", "ASC"]],
      attributes: ["id", "subject", "grade_id", "display_order", "icon"],
      offset: params["offset"],
      limit: params["size"],
    });
    return subject;
  };
}

module.exports = new SubjectService();
