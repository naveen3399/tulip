const cmsDBConnection = require("../config/dbconfig/cmsdbconfig");
const activitiesService = require("../service/activity.service");
const { QueryTypes } = require("sequelize");
const logger = require("../config/logger/logger")(module);
class LearningUnitService {
  findLearningUnitByActivity = async (activityId) => {
    let tags = await activitiesService.findTagsByActivityId(activityId);
    let response;
    if (tags.length > 0) {
      tags = tags[0]["tag"].split(",");
      let type = tags[0]["type"];
      let targetIds = await activitiesService.findTagIdByTags(tags);
      if (targetIds.length > 0) {
        let query = await this.queryGenerator(targetIds.map((x) => x["tid"]));
        response = await this.findLearningUnitIdsByQuery(query);
      }
    }
    return response;
  };

  findLearningUnitIdsByQuery = async (query) => {
    const result = await cmsDBConnection.query(query, {
      type: QueryTypes.SELECT,
    });
    logger.info("findTagIdByTags::[query]="+ query + "[result]="+ JSON.stringify(result));

    return result;
  };
  findSoultionByIdAndRevisionId = async (params) => {
    let result;
    try{
      result = await cmsDBConnection.query(
        `select
      field_solution_value as solution
    from
      node_revision__field_solution nrfs
    WHERE
      revision_id =:revisionId
      and entity_id =:learningUnitId;`,
        {
          replacements: params,
          type: QueryTypes.SELECT,
        }
      );
    }catch(e){
      logger.error("Error occured while getting Solution");
      logger.error(e);
    }    
    return result;
  };
  findHintsByIdAndRevisionId = async (params) => {
    let result;
    try{
      result = await cmsDBConnection.query(
        `SELECT
      field_hints_value as hints
    FROM
      node_revision__field_hints nrfh
    WHERE
      revision_id =:revisionId
      and entity_id =:learningUnitId;`,
        {
          replacements: params,
          type: QueryTypes.SELECT,
        }
      );
    }catch(e){
      logger.error("Error occured while getting hints");
      logger.error(e);
    }
    
    return result;
  };
  findH5pDependencyByIdAndRevisionId = async (params) => {
    const result = await cmsDBConnection.query(
      `select hpl.machine_name 'machineName',hpl.minor_version 'minorVersion',hpl.major_version 'majorVersion',hpl.library_id,nrfhp.field_h5p_h5p_content_id as h5pId
    from
        h5p_content hpc
    inner join h5p_content_libraries hpcl on
        hpc.id = hpcl.content_id
    inner join h5p_libraries hpl on
        hpcl.library_id = hpl.library_id
    inner join node_revision__field_h5p nrfhp on
    nrfhp.field_h5p_h5p_content_id =hpc.id 
    where
    nrfhp.revision_id =:revisionId
	and nrfhp.entity_id =:learningUnitId;`,
      {
        replacements: params,
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };

  findRelatedVideoByIdAndRevisionId = async (params) => {
    let result;
    try{
      result = await cmsDBConnection.query(
        `SELECT
      field_related_videos_uri uri,field_related_videos_title title from
        node_revision__field_related_videos nrfrv
      WHERE
        revision_id =:revisionId and bundle='learning_unit'
        and entity_id =:learningUnitId;
      `,
        {
          replacements: params,
          type: QueryTypes.SELECT,
        }
      );
    }catch(e){
      logger.error("Error occured while getting relative videos");
      logger.error(e);
    }
    
    return result;
  };
  findH5pContentById = async (h5pId) => {
    const result = await cmsDBConnection.query(
      `select
    hpl.library_id,
    hpl.machine_name,
    hpl.embed_types,
    hpl.title,
    hpc.title as content_title,
    hpc.default_language,
    hpc.license,hpc.parameters
from
    h5p_content hpc
inner join h5p_libraries hpl on
    hpc.library_id = hpl.library_id
where
    hpc.id = :h5pId;`,
      {
        replacements: {
          h5pId,
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  };
  findAudioByIdAndRevisionId = async (params) => {
    let result;
    try{
      result = await cmsDBConnection.query(
        `  
      SELECT
        f_managed.filename as fileName,
        f_managed.uri as uri,
        f_managed.filemime as filemime,
        f_managed.filesize as fileSize,
        f_audio_lang.field_audio_language_value as language
      FROM
      node_revision__field_audio_upload as f_a_upload
      inner join field_collection_item as f_c_item 
                  ON
        f_a_upload.field_audio_upload_value = f_c_item.item_id
      and f_a_upload.field_audio_upload_revision_id = f_c_item.revision_id
      inner join field_collection_item__field_audio_file as f_c_i_audio_file 
                  ON
        f_c_item.item_id = f_c_i_audio_file.entity_id
      and f_c_item.revision_id = f_c_i_audio_file.revision_id
      inner join file_managed as f_managed 
                  ON
        f_c_i_audio_file.field_audio_file_target_id = f_managed.fid
      inner join field_collection_item__field_audio_language as f_audio_lang 
                  ON
        f_c_item.item_id = f_audio_lang.entity_id
      and f_c_item.revision_id = f_audio_lang.revision_id
      where
        f_c_item.field_name = 'field_audio_upload'
      and 
                  f_a_upload.bundle = 'learning_unit'
      and 
                  f_a_upload.entity_id =:learningUnitId
      and f_a_upload.revision_id =:revisionId
      `,
        {
          replacements: params,
          type: QueryTypes.SELECT,
        }
      );
    }catch(e){
      logger.error("Error occured while getting LU Audio");
      logger.error(e);
    }
    
    return result;
  };

  queryGenerator = async (tagIds) => {
    let joins = "";
    let whereClause = "";
    for (let [index, value] of tagIds.entries()) {
      joins += ` INNER JOIN node__field_tags node__field_tags_value_${index} ON node_field_data.nid = node__field_tags_value_${index}.entity_id
        AND node__field_tags_value_${index}.field_tags_target_id = ${value}`;
      whereClause += ` AND node__field_tags_value_${index}.field_tags_target_id = ${value}`;
    }
    return `SELECT node_field_data.nid as learningUnitId,revised.revisedContent as revisionId,node_field_data.title as title FROM node_field_data node_field_data  ${joins} inner join (
  select
    content_entity_id ,
    MAX(content_entity_revision_id) as revisedContent
  from
    content_moderation_state_field_revision as s
  where
    s.moderation_state = 'published'
  group by
    content_entity_id) revised on revised.content_entity_id=node_field_data.nid where node_field_data.type = 'learning_unit' ${whereClause}`;
  };
}

module.exports = new LearningUnitService();
