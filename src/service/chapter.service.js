const { initModels } = require("../models/adminapp/init-models");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

let models = initModels(adminDBConnection);
class ChapterService {
  findAll = async (params) => {
    const chapters = await models.chapter.findAll({});
    return chapters;
  };
  createChapter = async (input) => {
    const uuid = uuidv4();
    const sql = `
        INSERT INTO chapter (id, school_id, title, description,display_order)
        VALUES ( '${uuid}','${input.school_id}', 
        '${input.title}','${input.description}','${input.display_order}');
      `;
     adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };
  subjectChapter = async (input) => {
    const uuid = uuidv4();
    const sql = `
        INSERT INTO subject_chapter (id, chapter_id, subject_id,
          school_id,display_order)
        VALUES ( '${uuid}', 
        '${input.chapter_id}','${input.subject_id}','${input.school_id}','${input.display_order}');
      `;
     adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
    return uuid;
  };
  findBySubjectId = async (params) => {
    const result = await adminDBConnection.query(
      `select
              c.title as chapter ,
              ct.chapter_id ,
              c.description as chapter_description,
              c.icon as chapter_icon,
              sc.display_order as chapter_order,
              t2.title as topic,
              t2.description as topic_description,
              ct.topic_id ,
              ct.display_order as topic_order
            from
              subject_chapter sc
            inner join chapter_topic ct on
              sc.chapter_id = ct.chapter_id
            inner join chapter c on
              c.id = sc.chapter_id
            inner join topic t2 on
              ct.topic_id = t2.id
            where
              sc.subject_id = :subjectId
            order by
              sc.display_order ,
              ct.display_order `,
      {
        replacements: {
          subjectId: params["subjectId"],
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };
}

module.exports = new ChapterService();
