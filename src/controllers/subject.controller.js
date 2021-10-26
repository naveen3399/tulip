const subjectService = require("../service/subject.service.js");
const logger = require("../config/logger/logger")(module);

class SubjectController {
    findAll = async (req, res) => {
        logger.debug("Rest request to retrieve all Details");
        let response = await subjectService.findAll();
        res.send(response);
      };
      createSubject = async (req, res) => {
        logger.debug("Rest request to create Subject");
        let response = await subjectService.createSubject(req.body);
        res.send(response);
      };
      findByGradeId = async (req, res) => {
        logger.debug(
          "Rest request to retrieve Subject by Grade Id",
          JSON.stringify(req.params)
        );
        if (req["params"] && req["params"]["gradeId"]) {
          let page = !req.query.page ? 0 : req.query.page;
          let size = !req.query.size ? 100 : req.query.size;
          let offset = page * size;
          let params = {
            gradeId: req["params"]["gradeId"],
            offset: offset,
            size: size,
          };
          let response = await subjectService.findBygradeId(params);
          res.send(response);
        } else res.send({ Error: "Please provide a valid grade Id" }).status(400);
      };

}

module.exports = new SubjectController();