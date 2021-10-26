const gradeService = require("../service/grade.service");
const logger = require("../config/logger/logger")(module);

class GradeController {
  findAll = async (req, res) => {
    logger.debug("Rest request to retrieve all grades");
    let response = await gradeService.findAllGrades();
    res.send(response);
  };
  findBySchoolId = async (req, res) => {

    logger.debug("Rest request to retrieve grades By school Id", JSON.stringify(req.params));
    if (req['params'] && req['params']['schoolId']) {
     
      let page = !req.query.page ? 0 : req.query.page;
      let size = !req.query.size ? 100 : + req.query.size;
      let offset = page * size;
      let params = {
        schoolId: req['params']['schoolId'],
        offset: offset,
        size: size
      }
      let response = await gradeService.findBySchoolId(params);
      res.send(response);
    } else res.send({ "Error": "Please provide a valid school Id" }).status(400);
  }
  createGrade = async (req, res) => {
    logger.debug("Rest request to Create grade");
    let response = await gradeService.createGrade(req.body);
    res.send(response);
  };
}

module.exports = new GradeController();
