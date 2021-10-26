const { initModels } = require("../models/adminapp/init-models");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

let models = initModels(adminDBConnection);
class SubjectService {
  findAll = async (params) => {
    const subject = await models.student.findAll({});
    return subject;
  };
  createStudent = async (params) => {
    let studentId = uuidv4();
    const sql = `
        INSERT INTO student (id, email)
        VALUES ( ${studentId},'${params.emailId}');`;
    let student = await adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return studentId;
  };
  updateOrCreate = async (params) => {
    const studentEmail = params.emailId;
    const studentFound = await models.student.findOne({
      where: { email: studentEmail },
    });
    if (!studentFound) {
      // Student not found, create a new one
      let studentId = uuidv4();
      const student = await models.student.create({
        id: studentId,
        email: studentEmail,
      });
      return { studentId: student.id };
    } else {
      return { studentId: studentFound.id };
    }
  };

  findByEmailId = async (params) => {
    const result = await adminDBConnection.query(
      `select
    st.email from student st where st.email = :email;`,
      {
        replacements: {
          email: params["emailId"],
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };
}

module.exports = new SubjectService();
