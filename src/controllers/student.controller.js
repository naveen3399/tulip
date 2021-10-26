const studentService = require("../service/student.service.js");
const logger = require("../config/logger/logger")(module);
class StudentController {
  findAll = async (req, res) => {
    logger.debug("Rest request to retrieve all students");
    let response = await studentService.findAll();
    res.send(response);
  };
  createStudent = async (req, res) => {
    logger.debug("Rest request to create student.");
    let response = await studentService.createStudent(req.body);
    res.send(response);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new StudentController();
