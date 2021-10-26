const learningUnitService = require("../service/learning_unit.service");
const activitiesService = require("../service/activity.service");
const logger = require("../config/logger/logger")(module);

class LearningUnitController {
  findLearningUnitById = async (req, res, next) => {
    logger.debug("Rest request to retrieve Learning Unit Detail");
    if (req['params'] && req['params']['learningUnitId']) {
      let params = {
        learningUnitId: req['params']['learningUnitId']
      }
      let response = await learningUnitService.findLearningUnitById(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid learning unit Id" }).status(400);
  };

  findH5pContentByLearningUnitId = async (req, res, next) => {
    logger.debug("Rest request to retrieve H5p content Detail for Learning Unit");
    if (req['params'] && req['params']['learningUnitId']) {
      let params = {
        learningUnitId: req['params']['learningUnitId']
      }
      let response = await learningUnitService.findH5pContentByLearningUnitId(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid learning unit Id" }).status(400);
  };

  findSolutionByLearningUnitId = async (req, res, next) => {
    logger.debug("Rest request to retrieve solution Detail for Learning Unit");
    if (req['params'] && req['params']['learningUnitId']) {
      let params = {
        learningUnitId: req['params']['learningUnitId']
      }
      let response = await learningUnitService.findSolutionByLearningUnitId(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid learning unit Id" }).status(400);
  };

  findAudiosByLearningUnitId = async (req, res, next) => {
    logger.debug("Rest request to retrieve audio Detail for Learning Unit");
    if (req['params'] && req['params']['learningUnitId']) {
      let params = {
        learningUnitId: req['params']['learningUnitId']
      }
      let response = await learningUnitService.findAudiosByLearningUnitId(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid learning unit Id" }).status(400);
  };

  findHintsByLearningUnitId = async (req, res, next) => {
    logger.debug("Rest request to retrieve hints for Learning Unit");
    if (req['params'] && req['params']['learningUnitId']) {
      let params = {
        learningUnitId: req['params']['learningUnitId']
      }
      let response = await learningUnitService.findHintsByLearningUnitId(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid learning unit Id" }).status(400);
  };

  getLearningUnitsByTag = async (req, res, next) => {
    logger.debug("Rest request to retrieve all Learning Unit by Tag");
    if (req['query'] && req['query']['tags']) {
      let params = {
        tags: req['query']['tags']
      }
      let response = await learningUnitService.getLearningUnitsByTag(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid tag" }).status(400);
  };

  getLearningUnitIdsByTag = async (req, res, next) => {
    logger.debug("Rest request to retrieve all Learning Unit Id by Tag");
    if (req['query'] && req['query']['tags']) {
      let params = {
        tags: req['query']['tags']
      }
      let response = await learningUnitService.getLearningUnitIdsByTag(params);
      res.send(response);
    } else res.send({ "error": "Please provide a valid tag" }).status(400);
    let params = {
      tags: req['query']['tags']
    }
  };
}


module.exports = new LearningUnitController();
