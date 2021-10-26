const topicService = require("../service/topic.service");
const logger = require("../config/logger/logger")(module);

class TopicController {
  findAll = async (req, res) => {
    logger.debug("Rest request to retrieve all Details");
    let response = await topicService.findAll();
    res.send(response);
  };
  createTopic = async (req, res) => {
    logger.debug("Rest request to create topic");
    let response = await topicService.createTopic(req.body);
    res.send(response);
  };
  chapterTopic= async (req, res) => {
    logger.debug("Rest request to link Chapter and topic");
    let response = await topicService.chapterTopic(req.body);
    res.send(response);
  };
  findByChapterId = async (req, res) => {
    logger.debug(
      "Rest request to get topic details by ChapterId",
      JSON.stringify(req.params)
    );
    if (req["params"] && req["params"]["chapterId"]) {
      let params = {
        chapterId: req["params"]["chapterId"],
      };
      let result = await topicService.findByChapterId(params);
      let topicIds = [...new Set(result.map((item) => item["topic_id"]))];
      let response = [];

      for (let topicId of topicIds) {
        let topicObj = null;
        let activities = [];
        for (let {
          topic,
          topic_description,
          topic_id,
          topic_order,
          activity,
          activity_id,
          activity_order,
          type,
        } of result) {
          if (topic_id === topicId) {
            topicObj = { topic, topic_description, topic_id, topic_order };
            if (activity_id)
              activities.push({ activity, activity_id, activity_order, type });
          }
        }
        const { topic, topic_description, topic_id, topic_order } = topicObj;
        response.push({
          topic,
          topic_description,
          topic_id,
          topic_order,
          activities,
        });
      }
      res.send(response);
    } else res.send({ Error: "Please provide a valid chapter Id" }).status(400);
  };
}

module.exports = new TopicController();
