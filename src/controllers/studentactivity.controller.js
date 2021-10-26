const studentActivityService = require("../service/studentactivity.service");
const logger = require("../config/logger/logger")(module);
class StudentActivityController {
  startPracticeActivity = async (req, res) => {
    logger.debug("Rest request to start practice activity");
    const studentId =
      req["params"] && req["params"]["studentId"]
        ? req["params"]["studentId"]
        : "";
    const activityId =
      req["params"] && req["params"]["activityId"]
        ? req["params"]["activityId"]
        : "";
    if (activityId != "" && studentId != "") {
      let response = await studentActivityService.startPracticeActivity(
        studentId,
        activityId
      );
      res.send(response);
    } else {
      res.send({ Error: "Invalid Request" }).status(400);
    }
  };

  getRecentViewedSubjects = async (req, res) => {
    logger.debug("Rest request to retrieve top 3 subjected viewed by student");
    if (req["params"] && req["params"]["studentId"]) {
      let response = await studentActivityService.getRecentViewedSubjects(
        req["params"]["studentId"]
      );
      res.send(response);
    } else {
      res.send({ Error: "Invalid Request" }).status(400);
    }
  };
}

module.exports = new StudentActivityController();
