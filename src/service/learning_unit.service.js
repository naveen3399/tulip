const cmsDBConnection = require("../config/dbconfig/cmsdbconfig");
const { QueryTypes } = require('sequelize');
const logger = require("../config/logger/logger")(module);
class LearningUnitService {
  findLearningUnitById = async (params) => {
    const result = await cmsDBConnection.query(`SELECT
          n_f_data.nid as learningUnitId,
          n_f_data.title as title
        FROM node_field_data AS n_f_data
        WHERE n_f_data.type = 'learning_unit'
          AND n_f_data.status = 1
          AND n_f_data.nid = :learning_unit_id;`, {
      replacements: {
        learning_unit_id: params['learningUnitId']
      },
      type: QueryTypes.SELECT
    })
    return result;
  }
  findH5pContentByLearningUnitId = async (params) => {
      const result = await cmsDBConnection.query(`SELECT
            n_f_data.nid as learningUnitId,
            n_f_data.title as title,
            h5p_f.parameters as h5pContent
          FROM node_field_data AS n_f_data
          INNER JOIN (SELECT
            *
          FROM node__field_h5p AS n_f_h5p
          INNER JOIN h5p_content AS h5p_c
            ON h5p_c.id = n_f_h5p.field_h5p_h5p_content_id) AS h5p_f
            ON h5p_f.entity_id = n_f_data.nid
            AND h5p_f.revision_id = n_f_data.vid
          WHERE n_f_data.type = 'learning_unit'
            AND n_f_data.status = 1
          AND n_f_data.nid = :learning_unit_id;`, {
      replacements: {
        learning_unit_id: params['learningUnitId']
      },
      type: QueryTypes.SELECT
    })
    return result;
  }
  findSolutionByLearningUnitId = async (params) => {
    const result = await cmsDBConnection.query(`SELECT
          n_f_data.nid as learningUnitId,
          n_f_data.title as title,
          n_f_sol.field_solution_value as solution
        FROM node_field_data AS n_f_data
        LEFT JOIN node__field_solution AS n_f_sol
          ON n_f_sol.entity_id = n_f_data.nid
          AND n_f_sol.revision_id = n_f_data.vid
        WHERE n_f_data.type = 'learning_unit'
          AND n_f_data.status = 1
          AND n_f_data.nid = :learning_unit_id;`, {
      replacements: {
        learning_unit_id: params['learningUnitId']
      },
      type: QueryTypes.SELECT
    })
    return result;
  }
  findAudiosByLearningUnitId = async (params) => {
    const result = await cmsDBConnection.query(`SELECT 
            n_f_data.nid as learningUnitId,
            n_f_data.title as title,
            f_managed.filename as fileName,
            f_managed.uri as uri,
            f_managed.filemime as filemime,
            f_managed.filesize as fileSize,
            f_audio_lang.field_audio_language_value as language
          FROM drupal.node_field_data as n_f_data
          left join drupal.node__field_audio_upload as f_a_upload 
            ON f_a_upload.entity_id = n_f_data.nid 
            and f_a_upload.revision_id = n_f_data.vid
          inner join drupal.field_collection_item as f_c_item 
            ON f_a_upload.field_audio_upload_value = f_c_item.item_id 
            and f_a_upload.field_audio_upload_revision_id = f_c_item.revision_id
          inner join drupal.field_collection_item__field_audio_file as f_c_i_audio_file 
            ON f_c_item.item_id = f_c_i_audio_file.entity_id 
            and f_c_item.revision_id = f_c_i_audio_file.revision_id
          inner join drupal.file_managed as f_managed 
            ON f_c_i_audio_file.field_audio_file_target_id = f_managed.fid
          inner join drupal.field_collection_item__field_audio_language as f_audio_lang 
            ON f_c_item.item_id = f_audio_lang.entity_id 
            and f_c_item.revision_id = f_audio_lang.revision_id
          where f_c_item.field_name = 'field_audio_upload'
            and n_f_data.type = 'learning_unit'
            and n_f_data.status = 1
          AND n_f_data.nid = :learning_unit_id;`, {
      replacements: {
        learning_unit_id: params['learningUnitId']
      },
      type: QueryTypes.SELECT
    })
    return result;
  }

  findHintsByLearningUnitId = async (params) => {
    const result = await cmsDBConnection.query(`SELECT 
          n_f_data.nid as learningUnitId,
          n_f_data.title as title,
          f_hint.field_hints_value as hints 
        FROM drupal.node_field_data as n_f_data
        left join drupal.node__field_hints as f_hint 
          ON f_hint.entity_id = n_f_data.nid 
          and f_hint.revision_id = n_f_data.vid
        where n_f_data.type = 'learning_unit'
        and n_f_data.status = 1
        AND n_f_data.nid = :learning_unit_id;`, {
      replacements: {
        learning_unit_id: params['learningUnitId']
      },
      type: QueryTypes.SELECT
    })
    return result;
  }

  getLearningUnitsByTag = async (params) => {
    let learning_units = await this.getLearningUnitIdsByTag(params);
    console.log('learning_units');
    console.log(learning_units);
    let learning_unit_ids = learning_units.map(learning_unit => learning_unit['learningUnitId']);
    const result = await cmsDBConnection.query(`SELECT
          n_f_data.nid as learningUnitId,
          n_f_data.title as title
        FROM node_field_data AS n_f_data
        WHERE n_f_data.type = 'learning_unit'
          AND n_f_data.status = 1
          AND n_f_data.nid IN (:learning_unit_ids)`, {
      replacements: {
        learning_unit_ids: learning_unit_ids
      },
      type: QueryTypes.SELECT
    })
    return result;
  }
  getLearningUnitIdsByTag = async (params) => {
    let tags;
    if (Array.isArray(params['tags'])) {
      tags = params['tags'];
    } else {
      tags = [params['tags']];
    }
    logger.info("tags::");
    logger.info(tags);
    let str_tags = tags.map(v => v.toLowerCase()).sort().join().replace(/' '/g, '');
    const result = await cmsDBConnection.query(`SELECT
      n_f_data1.nid as learningUnitId
      FROM node_field_data AS n_f_data1
    left join(
      SELECT
      n_f_data.nid as learningUnitId,
      GROUP_CONCAT(DISTINCT trim(LOWER(t_f_data.name)) ORDER BY LOWER(t_f_data.name) asc) as tags 
      FROM node_field_data AS n_f_data
      LEFT JOIN node__field_tags AS n_f_tag
        ON n_f_tag.entity_id = n_f_data.nid
        AND n_f_tag.revision_id = n_f_data.vid
      LEFT JOIN taxonomy_term_field_data AS t_f_data
        ON n_f_tag.field_tags_target_id = t_f_data.tid
      WHERE n_f_data.type = 'learning_unit'
        AND n_f_data.status = 1
        AND t_f_data.name IN (:tags)
        group by n_f_data.nid) as tag ON tag.learningUnitId = n_f_data1.nid
      where n_f_data1.type = 'learning_unit'
      AND n_f_data1.status = 1
      and REPLACE(tag.tags, ' ', '') = :str_tags;`, {
      replacements: {
        tags: tags,
        str_tags: str_tags
      },
      type: QueryTypes.SELECT
    })
    console.log(result);
    return result;
  }
  findLearningUnitIdsByQuery = async (query) => {
    const result = await cmsDBConnection.query(query, { type: QueryTypes.SELECT });
    return result;
  }
}

module.exports = new LearningUnitService();
