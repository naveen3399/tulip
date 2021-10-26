const learningUnitService = require("../service/learningUnitV2.service");
const logger = require("../config/logger/logger")(module);

class LearningUnitControllerV2 {
  findLearningUnitByActivity = async (req, res) => {
    logger.debug("Rest request to find Learning unit by activity Id");
    if (req["params"] && req["params"]["activityId"]) {
      let response = await learningUnitService.findLearningUnitByActivity(
        req["params"]["activityId"]
      );
      res.send({ response });
    }
  };
  getLearningUnits = async (req, res) => {
    logger.debug("Rest request to find Learning unit by activity Id");
    if (
      req["params"] &&
      req["params"]["revisionId"] &&
      req["params"]["learningUnitId"]
    ) {
      res.send(await constructH5pResponse(req));
    } else res.send({ message: "Please provide a valid request" }).status(400);
  };
}

const constructH5pResponse = async (req) => {
  let h5pResponse, contentResponse;
  let hints = await learningUnitService.findHintsByIdAndRevisionId(
    req["params"]
  );
  let solution = await learningUnitService.findSoultionByIdAndRevisionId(
    req["params"]
  );
  let relatedVideos =
    await learningUnitService.findRelatedVideoByIdAndRevisionId(req["params"]);
  let preloadedDependencies =
    await learningUnitService.findH5pDependencyByIdAndRevisionId(req["params"]);
  let audio = await learningUnitService.findAudioByIdAndRevisionId(
    req["params"]
  );
  if (preloadedDependencies.length > 0 && preloadedDependencies[0]["h5pId"]) {
    let content = await learningUnitService.findH5pContentById(
      +preloadedDependencies[0]["h5pId"]
    );
    h5pResponse = {
      title: content[0]["title"],
      content_title: content[0]["content_title"],
      language: content[0]["language"] || "en",
      mainLibrary: content[0]["machine_name"],
      embedTypes: content[0]["embed_types"],
      license: content[0]["license"],
      library_id: content[0]["library_id"],
      preloadedDependencies: preloadedDependencies,
    };
    contentResponse = JSON.parse(content[0]["parameters"]);
    try {
      if (contentResponse["presentation"]) {
        for (let { elements } of contentResponse["presentation"]["slides"]) {
          for (let { action } of elements) {
            if (
              action["params"] &&
              action["params"]["file"] &&
              action["params"]["file"]["path"]
            )
              action["params"]["file"]["path"] = `${
                process.env.CMS_URL || "http://13.233.81.205/cms"
              }/sites/default/files/h5p/content/${
                preloadedDependencies[0]["h5pId"]
              }/${action["params"]["file"]["path"]}`;
            else if (action["params"] && action["params"]["files"]) {
              for (let itr of action["params"]["files"]) {
                itr.path = `${
                  process.env.CMS_URL || "http://13.233.81.205/cms"
                }/sites/default/files/h5p/content/${
                  preloadedDependencies[0]["h5pId"]
                }/${itr.path}`;
              }
            } else if (action["params"] && action["params"]["visuals"]) {
              action.params.visuals.poster.path = `${
                process.env.CMS_URL || "http://13.233.81.205/cms"
              }/sites/default/files/h5p/content/${
                preloadedDependencies[0]["h5pId"]
              }/${action["params"].visuals.poster.path}`;
              for (let itr of action["params"].sources) {
                itr.path = `${
                  process.env.CMS_URL || "http://13.233.81.205/cms"
                }/sites/default/files/h5p/content/${
                  preloadedDependencies[0]["h5pId"]
                }/${itr.path}`;
              }
            }
          }
        }
      }
    } catch (error) {
      logger.error("Error in processing content:" + error);
    }
  }
  return {
    h5p: h5pResponse,
    content: contentResponse,
    hints: (hints && hints.length > 0) ? hints.map((i) => i["hints"]) : [],
    solution: (solution && solution.length > 0) ? solution[0]["solution"] : [],
    relatedVideos: relatedVideos,
    audio:
      (audio && audio.length > 0)
        ? audio.map((i) => {
            i.uri = `${
              process.env.CMS_URL || "http://13.233.81.205/cms"
            }/sites/default/files/${i["uri"].split("public://")[1]}`;
            return i;
          })
        : [],
  };
};

module.exports = new LearningUnitControllerV2();
