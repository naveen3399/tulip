const chapterService = require("../service/chapter.service");
const logger = require("../config/logger/logger")(module);

class ChapterController {
  findAll = async (req, res) => {
    logger.debug("Rest request to retrieve all chapter Details");
    let response = await chapterService.findAll();
    res.send(response);
  };
  subjectChapter = async (req, res) => {
    logger.debug("Rest request to link Subject with Chapter");
    let response = await chapterService.subjectChapter(req.body);
    res.send(response);
  };
  findBySubjectId = async (req, res) => {
    logger.debug("Rest request to retrieve Chapter details");
    if (req['params'] && req['params']['subjectId']) {
      let params = {
        subjectId: req['params']['subjectId']
      }
      let result = await chapterService.findBySubjectId(params);
      let chapterIds = [...new Set(result.map(item => item['chapter_id']))];
      let response = [];

      for (let chapterId of chapterIds) {
        let chapterObj = null;
        let topics = [];
        for (let { chapter, chapter_id, chapter_description, chapter_icon, chapter_order, topic, topic_description, topic_id, topic_order } of result) {
          if (chapter_id === chapterId) {
            chapterObj = { chapter, chapter_id, chapter_description, chapter_icon, chapter_order };
            topics.push({ topic, topic_description, topic_id, topic_order });
          }
        }
        const { chapter, chapter_id, chapter_description, chapter_icon, chapter_order } = chapterObj;
        response.push({ chapter, chapter_id, chapter_description, chapter_icon, chapter_order, topics, progress: Math.floor(Math.random() * 100) + 1 });
      }
      res.send(response);
    } else res.send({ "Error": "Please provide a valid SubjectId" }).status(400);
  }
  createChapter = async (req, res) => {
    logger.debug("Rest request to create Chapter");
    let response = await chapterService.createChapter(req.body);
    res.send(response);
  };
}


module.exports = new ChapterController();
