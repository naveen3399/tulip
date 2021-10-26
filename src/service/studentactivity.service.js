const logger = require("../config/logger/logger")(module);
var Set = require("collections/set");
const adminDBConnection = require("../config/dbconfig/adminappdbconfig");
const activityService = require("./activity.service");
const learningUnitService = require("./learningUnitV2.service");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { initModels } = require("../models/adminapp/init-models");
let models = initModels(adminDBConnection);

class StudentActivityService {
  startPracticeActivity = async (studentId, activityId) => {
    let studentpracticeactivity = {};
    let practiceQuestions = [];
    let practiceQuestionIds = [];
    let previousAttemptQuestionIds = [];
    let attempt = 1;
    let learningUnits = await learningUnitService.findLearningUnitByActivity(
      activityId
    );
    logger.info("learningUnits:");
    logger.info(JSON.stringify(learningUnits));

    const totalLearningUnits = learningUnits ? learningUnits.length : 0;

    //Check if there are any LU's matching tag's
    if (totalLearningUnits > 0) {
      const activity = await activityService.findActivityById(activityId);
      //LU limit on Activity
      const activityLULimit = activity && activity.limit ? activity.limit : 5;

      if (totalLearningUnits > activityLULimit) {
        previousAttemptQuestionIds = await this.previousPracticeQuestionIds(
          studentId,
          activityId
        );
        const totalPreviousQuestions = previousAttemptQuestionIds
          ? previousAttemptQuestionIds.length
          : 0;

        if (totalPreviousQuestions > 0) {
          let tempLearningUnits=[];
          Array.prototype.push.apply(tempLearningUnits,learningUnits);

          console.log("element ID::"+JSON.stringify(tempLearningUnits));

          //Filter the LU's that are already shown to student
            previousAttemptQuestionIds.forEach((questionId) => {
            tempLearningUnits.forEach((element,index) => {
              if(questionId == element.learningUnitId ){
                tempLearningUnits.splice(index)
              }
            })
          });
          const totalTempLearningUnits = tempLearningUnits
            ? tempLearningUnits.length
            : 0;
          if (
            totalTempLearningUnits > 0 &&
            totalTempLearningUnits >= activityLULimit
          ) {
            for (let i = 0; i < activityLULimit; i++) {
              practiceQuestions.push(tempLearningUnits[i]);
              practiceQuestionIds.push(tempLearningUnits[i].learningUnitId);
            }
          } else if (totalTempLearningUnits > 0) {
            for (let i = 0; i < totalTempLearningUnits; i++) {
              practiceQuestions.push(tempLearningUnits[i]);
              practiceQuestionIds.push(tempLearningUnits[i].learningUnitId);
            }
          } else {
            
            learningUnits = await this.shuffleLU(learningUnits);
            for (let i = 0; i < activityLULimit; i++) {
              practiceQuestions.push(learningUnits[i]);
              practiceQuestionIds.push(learningUnits[i].learningUnitId);
            }
          }
        } else {
          //Studing pciked up this activity for first time
          learningUnits = await this.shuffleLU(learningUnits);
          for (let i = 0; i < activityLULimit; i++) {
            practiceQuestions.push(learningUnits[i]);
            practiceQuestionIds.push(learningUnits[i].learningUnitId);
          }
        }
      } else {
        //Less Learning units than the  limit to show per activity
        for (let i = 0; i < totalLearningUnits; i++) {
          practiceQuestions.push(learningUnits[i]);
          practiceQuestionIds.push(learningUnits[i].learningUnitId);
        }
      }
      studentpracticeactivity.iscomplete = false;
      studentpracticeactivity.attempt = attempt;
      studentpracticeactivity.questionnaire_ids = practiceQuestionIds;
      studentpracticeactivity.student_id = studentId;
      studentpracticeactivity.activity_id = activityId;
      studentpracticeactivity.start_time = new Date().toISOString();
      this.createPraticeAttempt(studentpracticeactivity);
    } else {
      //No Learning units, returning empty array
      return [];
    }
    return practiceQuestionIds;
  };

  createPraticeAttempt = (inputobj) => {
    const sql = `INSERT INTO student_activity_attempt(id,student_id,activity_id,
        questionnaire_ids,attempt,start_time,iscomplete) VALUES('${uuidv4()}',
        '${inputobj.student_id}','${inputobj.activity_id}',
        '${inputobj.questionnaire_ids}',
        '${inputobj.attempt}','${inputobj.start_time}','${
      inputobj.iscomplete
    }')`;
    adminDBConnection.query(sql, {
      type: QueryTypes.INSERT,
    });
  };

  previousPracticeQuestionIds = async (studentId, activityId) => {
    let previousAttemptQuestionIds = new Set();
    try {
      const sql = `SELECT questionnaire_ids from  student_activity_attempt where
      student_id='${studentId}' and
      activity_id= '${activityId}' `;

      let activityPracticeAttempts = await adminDBConnection.query(sql, {
        type: QueryTypes.SELECT,
      });

      if (activityPracticeAttempts && activityPracticeAttempts.length > 0) {
        activityPracticeAttempts.forEach((element) => {
          let tmpPreviousQuestionIds = element.questionnaire_ids.split(",");
          tmpPreviousQuestionIds.forEach((questionId) => {
            previousAttemptQuestionIds.add(questionId);
          });
        });
      }
      console.log(previousAttemptQuestionIds);
    } catch (e) {
      logger.error("Error occured while getting previous questions");
      logger.error(e);
    }

    return previousAttemptQuestionIds;
  };

  getRecentViewedSubjects = async (studentId) => {
    const sql = `SELECT min(subject.subject) as subject, min(topic.title) as topic,
    min(activity.name) as activity, saa.activity_id as activity_id,
	  min(chapter.title) as chapter,min(chapter.description) as chapter_description,
	  min(chapter.icon) as chapter_icon,min(sc.chapter_id::text) as chapter_id
    ,min(sc.subject_id::text) as subject_id
    FROM student_activity_attempt saa
    INNER JOIN activity activity 
    ON saa.activity_id = activity.id
    INNER JOIN topic_activity ta
    ON ta.activity_id = activity.id
    INNER JOIN topic topic
    ON topic.id = ta.topic_id
    INNER JOIN chapter_topic ct
    ON topic.id = ct.topic_id
    INNER JOIN chapter chapter
    ON chapter.id = ct.chapter_id
    INNER JOIN subject_chapter sc
    ON sc.chapter_id = ct.chapter_id
    INNER JOIN subject subject
    ON subject.id = sc.subject_id
    WHERE saa.student_id = '${studentId}'
    GROUP BY saa.activity_id
    ORDER BY max(saa.start_time)
    LIMIT 3`;

    let response = await adminDBConnection.query(sql, {
      type: QueryTypes.SELECT,
    });
    return response;
  };

  shuffleLU = async (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
}
module.exports = new StudentActivityService();
