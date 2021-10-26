const { initModels } = require("../models/adminapp/init-models");
const { QueryTypes } = require("sequelize");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const cmsDBConnection = require("../config/dbconfig/cmsdbconfig");
const logger = require("../config/logger/logger")(module);
const { v4: uuidv4 } = require("uuid");

//const activity = require("../models/adminapp/activity");
let models = initModels(adminDBConnection);
class ActivitiesService {
  findAll = async (params) => {
    const activities = await models.activity.findAll({});
    return activities;
  };

  findActivityById = async (activityId) => {
    const activity = await models.activity.findOne({
      where: { id: activityId },
    });
    return activity;
  };

  createActivity = async (input) => {
    const uuid = uuidv4();
    const sql = `
        INSERT INTO activity (id, tag, name, display_order, type)
        VALUES ( '${uuid}','${input.tag}', 
        '${input.name}','${input.display_order}','${input.type}');
      `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };

  topicActivity = async (input) => {
    const uuid = uuidv4();
    const sql = `
        INSERT INTO topic_activity (id, topic_id, display_order, weight,activity_id)
        VALUES ( '${uuid}','${input.topic_id}', 
        '${input.display_order}','${input.weight}','${input.activity_id}');
      `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };

  findTagsByActivityId = async (activityId) => {
    const tags = await models.activity.findAll({
      where: { id: activityId },
      order: [["display_order", "ASC"]],
      attributes: ["tag", "type"],
    });
    logger.info("findTagsByActivityId::activityId="+ activityId + "[Tags]="+ JSON.stringify(tags));
    return tags;
  };
  findTagIdByTags = async (tags) => {
    const targetIds = await cmsDBConnection.query(
      "SELECT tid from taxonomy_term_field_data where vid ='tags' and name in (:tags)",
      {
        replacements: { tags },
        type: QueryTypes.SELECT,
      }
    );
    //logger.debug("targetIds");
    //logger.debug(JSON.stringify(targetIds));
    logger.info("findTagIdByTags::[tags]="+ tags + "[targetIds]="+ JSON.stringify(targetIds));
    return targetIds;
  };
}

module.exports = new ActivitiesService();
