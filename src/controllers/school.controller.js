const schoolService = require("../service/school.service");
const logger = require("../config/logger/logger")(module);
class SchoolController {
  
  findAll = async (req, res) => {
    logger.debug("Rest request to retrieve all Details");
    let response = await schoolService.findAll();
    res.send(response);
  };
  createSchool = async (req, res) => {
    logger.debug("Rest request to add school");
    logger.info(req.body);
    let response = await schoolService.createSchool(req.body);
    res.send(response);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new SchoolController();
