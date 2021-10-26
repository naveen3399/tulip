var DataTypes = require("sequelize").DataTypes;
var _activity = require("./activity");
var _chapter = require("./chapter");
var _chapter_topic = require("./chapter_topic");
var _grade = require("./grade");
var _school = require("./school");
var _student = require("./student");
var _student_activity_attempt = require("./student_activity_attempt");
var _student_chapter = require("./student_chapter");
var _student_questionnaire_resp = require("./student_questionnaire_resp");
var _student_school = require("./student_school");
var _subject = require("./subject");
var _subject_chapter = require("./subject_chapter");
var _topic = require("./topic");
var _topic_activity = require("./topic_activity");

function initModels(sequelize) {
  var activity = _activity(sequelize, DataTypes);
  var chapter = _chapter(sequelize, DataTypes);
  var chapter_topic = _chapter_topic(sequelize, DataTypes);
  var grade = _grade(sequelize, DataTypes);
  var school = _school(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var student_activity_attempt = _student_activity_attempt(sequelize, DataTypes);
  var student_chapter = _student_chapter(sequelize, DataTypes);
  var student_questionnaire_resp = _student_questionnaire_resp(sequelize, DataTypes);
  var student_school = _student_school(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var subject_chapter = _subject_chapter(sequelize, DataTypes);
  var topic = _topic(sequelize, DataTypes);
  var topic_activity = _topic_activity(sequelize, DataTypes);

  topic_activity.belongsTo(activity, { as: "activity", foreignKey: "activity_id"});
  activity.hasMany(topic_activity, { as: "topic_activities", foreignKey: "activity_id"});
  chapter_topic.belongsTo(chapter, { as: "chapter", foreignKey: "chapter_id"});
  chapter.hasMany(chapter_topic, { as: "chapter_topics", foreignKey: "chapter_id"});
  subject_chapter.belongsTo(chapter, { as: "chapter", foreignKey: "chapter_id"});
  chapter.hasMany(subject_chapter, { as: "subject_chapters", foreignKey: "chapter_id"});
  student_school.belongsTo(grade, { as: "grade", foreignKey: "grade_id"});
  grade.hasMany(student_school, { as: "student_schools", foreignKey: "grade_id"});
  subject.belongsTo(grade, { as: "grade", foreignKey: "grade_id"});
  grade.hasMany(subject, { as: "subjects", foreignKey: "grade_id"});
  chapter.belongsTo(school, { as: "school", foreignKey: "school_id"});
  school.hasMany(chapter, { as: "chapters", foreignKey: "school_id"});
  grade.belongsTo(school, { as: "school", foreignKey: "school_id"});
  school.hasMany(grade, { as: "grades", foreignKey: "school_id"});
  student_school.belongsTo(school, { as: "student", foreignKey: "student_id"});
  school.hasMany(student_school, { as: "student_schools", foreignKey: "student_id"});
  subject_chapter.belongsTo(school, { as: "school", foreignKey: "school_id"});
  school.hasMany(subject_chapter, { as: "subject_chapters", foreignKey: "school_id"});
  topic.belongsTo(school, { as: "school", foreignKey: "school_id"});
  school.hasMany(topic, { as: "topics", foreignKey: "school_id"});
  student_activity_attempt.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(student_activity_attempt, { as: "student_activity_attempts", foreignKey: "student_id"});
  student_chapter.belongsTo(student, { as: "student", foreignKey: "student_id"});
  student.hasMany(student_chapter, { as: "student_chapters", foreignKey: "student_id"});
  subject_chapter.belongsTo(subject, { as: "subject", foreignKey: "subject_id"});
  subject.hasMany(subject_chapter, { as: "subject_chapters", foreignKey: "subject_id"});
  student_chapter.belongsTo(subject_chapter, { as: "chapter", foreignKey: "chapter_id"});
  subject_chapter.hasMany(student_chapter, { as: "student_chapters", foreignKey: "chapter_id"});
  chapter_topic.belongsTo(topic, { as: "topic", foreignKey: "topic_id"});
  topic.hasMany(chapter_topic, { as: "chapter_topics", foreignKey: "topic_id"});
  topic_activity.belongsTo(topic, { as: "topic", foreignKey: "topic_id"});
  topic.hasMany(topic_activity, { as: "topic_activities", foreignKey: "topic_id"});
  student_activity_attempt.belongsTo(topic_activity, { as: "activity", foreignKey: "activity_id"});
  topic_activity.hasMany(student_activity_attempt, { as: "student_activity_attempts", foreignKey: "activity_id"});

  return {
    activity,
    chapter,
    chapter_topic,
    grade,
    school,
    student,
    student_activity_attempt,
    student_chapter,
    student_questionnaire_resp,
    student_school,
    subject,
    subject_chapter,
    topic,
    topic_activity,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
