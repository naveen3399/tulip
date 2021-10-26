const { initModels } = require("../models/adminapp/init-models");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const { v4: uuidv4 } = require("uuid");

const { QueryTypes } = require("sequelize");

let models = initModels(adminDBConnection);

class TopicService {
  findAll = async (params) => {
    const topics = await models.topic.findAll({});
    return topics;
  };
  createTopic = async (input) => {
    const uuid = uuidv4();
    const sql = `
        INSERT INTO topic (id, school_id, title, description,display_order)
        VALUES ( '${uuid}','${input.school_id}', 
        '${input.title}','${input.description}','${input.display_order}');
      `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };
  chapterTopic = async (input) => {
    const uuid = uuidv4();
    const sql = `
        INSERT INTO chapter_topic (id, chapter_id, topic_id, display_order)
        VALUES ( '${uuid}','${input.chapter_id}', 
        '${input.topic_id}','${input.display_order}');
      `;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };
  findByChapterId = async (params) => {
    const result = await adminDBConnection.query(
      `select
    t.title as topic,
    t.description as topic_description,
    t.id as topic_id,
    ct.display_order as topic_order,
    a.name as activity,
    a.id as activity_id,
    ta.display_order as activity_order,a.type 
  from
    chapter_topic ct
  inner join topic t on
    ct.topic_id = t.id
  left join topic_activity ta on
    ct.topic_id = ta.topic_id
  left join activity a on
    ta.activity_id = a.id
  where
    ct.chapter_id = :chapterId
  order by
    ct.display_order,
    ta.display_order asc;`,
      {
        replacements: {
          chapterId: params["chapterId"],
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };
}

module.exports = new TopicService();
