const activitiesService = require("../service/activity.service");
const logger = require("../config/logger/logger")(module);

class ActivityController {
  findAll = async (req, res) => {
    logger.debug("Rest request to retrieve all activities Details");
    let response = await activitiesService.findAll();
    res.send(response);
  };
  createActivity = async (req, res) => {
    logger.debug("Rest request to create Activity");
    let response = await activitiesService.createActivity(req.body);
    res.send(response);
  };
  topicActivity= async (req, res) => {
    logger.debug("Rest request to lin Topic to an Activity");
    let response = await activitiesService.topicActivity(req.body);
    res.send(response);
  };
}






module.exports = new ActivityController();
