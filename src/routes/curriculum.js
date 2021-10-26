const SchoolController = require("../controllers/school.controller");
const StudentController = require("../controllers/student.controller");
const GradeController = require("../controllers/grade.controller");
const TopicController = require("../controllers/topic.controller");
const ChapterController = require("../controllers/chapter.controller");
const ActivityController = require("../controllers/activity.controller");
const SubjectController = require("../controllers/subject.controller");
const LearningUnitController = require("../controllers/learning_unit.controller");
const LearningUnitControllerV2 = require("../controllers/learningUnitV2.controller");
const chapterController = require("../controllers/chapter.controller");
const userController = require("../controllers/user.controller");
const studentActivityController = require("../controllers/studentactivity.controller");

module.exports = (app) => {
  /**
   * This function let's you get list of the schools
   * @route GET /schools
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - Lists all the schools.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/schools").get(SchoolController.findAll);
  /**
   * This function let's you get list of Students
   * @route GET /students
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - list of Students.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/students").get(StudentController.findAll);
  /**
   * This function let's you get list of Grades
   * @route GET /grades
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - list of Grades.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/grades").get(GradeController.findAll);
  /**
   * This function let's you get list of topics
   * @route GET /topics
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - list of topics.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/topics").get(TopicController.findAll);
  /**
   * This function let's you get list of chapters
   * @route GET /chapters
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - list of chapters.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/chapters").get(ChapterController.findAll);
  /**
   * This function let's you get list of activities
   * @route GET /activities
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - list of activities.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/activities").get(ActivityController.findAll);
  /**
   * This function let's you get list of subjects
   * @route GET /subjects
   * @group  Curriculum - Operations to bulid/view Curriculum
   * @returns {object} 200 - list of subjects.
   * @returns {Error}  default - Unexpected error
   */
  app.route("/subjects").get(SubjectController.findAll);
  /**
   * Given the tag, This function let's you get list of learning Units
   * @route GET /learning-units/tag
   * @group Learning Units - Operations for Learning Units
   * @param {string} tag.required - tag name
   * @returns {object} 200 - list of Learning units by tag.
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/tag")
    .get(LearningUnitController.getLearningUnitsByTag);
  /**
   * Given the tag, This function let's you get list of learning Unit Id's by tag name
   * @route GET /learning-unit-ids/tag
   * @group Learning Units - Operations for Learning Units
   * @param {string} tag.query.required - tag name
   * @returns {object} 200 - list of Learning units id's by tag.
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-unit-ids/tag")
    .get(LearningUnitController.getLearningUnitIdsByTag);
  /**
   * Given the LU Id, This function let's you get learning Unit by Id
   * @route GET /learning-units/{learningUnitId}
   * @group Learning Units - Operations for Learning Units
   * @param {string} learningUnitId.path.required - learning Unit Id
   * @returns {object} 200 - Learning units by LU id.
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/:learningUnitId")
    .get(LearningUnitController.findLearningUnitById);
  /**
   * Given the LU Id, This function let's you get H5P-Content
   * @route GET /learning-units/{learningUnitId}/h5p-content
   * @group Learning Units - Operations for Learning Units
   * @param {string} learningUnitId.path.required - learning Unit Id
   * @returns {object} 200 - H5P-Content by LU id.
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/:learningUnitId/h5p-content")
    .get(LearningUnitController.findH5pContentByLearningUnitId);
  /**
   * Given the LU Id, This function let's you get solution for the LU
   * @route GET /learning-units/{learningUnitId}/solution
   * @group Learning Units - Operations for Learning Units
   * @param {string} learningUnitId.path.required - learning Unit Id
   * @returns {object} 200 - Solution for LU.
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/:learningUnitId/solution")
    .get(LearningUnitController.findSolutionByLearningUnitId);
  /**
   * Given the LU Id, This function let's you get language audio's for the LU
   * @route GET /learning-units/{learningUnitId}/audios
   * @group Learning Units - Operations for Learning Units
   * @param {string} learningUnitId.path.required - learning Unit Id
   * @returns {object} 200 - Audio associated with LU
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/:learningUnitId/audios")
    .get(LearningUnitController.findAudiosByLearningUnitId);
  /**
   * Given the LU Id, This function let's you get hints for the LU
   * @route GET /learning-units/{learningUnitId}/hints
   * @group Learning Units - Operations for Learning Units
   * @param {string} learningUnitId.path.required - learning Unit Id
   * @returns {object} 200 - Hints associated with LU
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/:learningUnitId/hints")
    .get(LearningUnitController.findHintsByLearningUnitId);
  /**
   * Given the School Id, This function let's you get grades associated with school
   * @route GET /schools/{schoolId}/grades
   * @group Curriculum - Operations for Learning Units
   * @param {string} schoolId.path.required - school Id
   * @returns {object} 200 - Grades associated with school
   * @returns {Error}  default - Unexpected error
   */
  app.route("/schools/:schoolId/grades").get(GradeController.findBySchoolId);
  /**
   * Given the Grade Id, This function let's you get all subjects associated with grade
   * @route GET /grades/{gradeId}/subjects
   * @group Curriculum - Operations for Learning Units
   * @param {string} gradeId.path.required - grade Id
   * @returns {object} 200 - Subjects associated with Grade
   * @returns {Error}  default - Unexpected error
   */
  app.route("/grades/:gradeId/subjects").get(SubjectController.findByGradeId);
  /**
   * Given the Subject Id, This function let's you get all chapters associated with subject
   * @route GET /subjects/{subjectId}/chapters
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {string} subjectId.path.required - Subject Id
   * @returns {object} 200 - Chapters associated with Subject
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/subjects/:subjectId/chapters")
    .get(ChapterController.findBySubjectId);
  /**
   * Given the Chapter Id, This function let's you get all topics associated with chapters
   * @route GET /chapters/{chapterId}/topics
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {string} chapterId.path.required - Chapter Id
   * @returns {object} 200 - topics associated with chapters
   * @returns {Error}  default - Unexpected error
   */
  app.route("/chapters/:chapterId/topics").get(TopicController.findByChapterId);

  /**
   * Given the Activity Id, This function let's you get all LU's associated with Activity
   * @route GET /topics/activities/{activityId}/learning-units
   * @group Learning Units - Operations for Learning Units
   * @param {string} activityId.path.required - Activity Id
   * @returns {object} 200 - LU's associated with Activity ID
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/topics/activities/:activityId/learning-units")
    .get(LearningUnitControllerV2.findLearningUnitByActivity);
  /**
   * Given the LU Id and Revision Id, This function let's you get LU
   * @route GET /learning-units/{learningUnitId}/revision/{revisionId}
   * @group Learning Units - Operations for Learning Units
   * @param {string} learningUnitId.path.required - Learning Unit Id
   * @param {string} revisionId.path.required - Revision Id
   * @returns {object} 200 - LU's associated with Learning Unit and Revision ID
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/learning-units/:learningUnitId/revision/:revisionId")
    .get(LearningUnitControllerV2.getLearningUnits);

  /**
   * @typedef School
   * @property {string} name.required - this is name of the School
   * @property {string} medium - this is medium that school teaches
   * @property {string} address - this is address of the School
   */

  /**
   * Create School
   * @route POST /school
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {School.model} school.body.required - School Details
   * @returns {object} 200 - School Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/school", SchoolController.createSchool);

  /**
   * @typedef Grade
   * @property {string} grade.required - this is name of the grade
   * @property {string} school_id - this is id of the School
   * @property {integer} display_order - this is order in which Grades to be displayed
   */
  /**
   * Create Grade
   * @route POST /grade
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {Grade.model} grade.body.required - Grade Details
   * @returns {object} 200 - Grade Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/grade", GradeController.createGrade);
  /**
   * @typedef Topic
   * @property {string} title.required - this is name of the School
   * @property {string} school_id - this is name of the School
   * @property {string} description - this is brief description about topic
   * @property {integer} display_order - this is order in which Topics to be displayed
   */
  /**
   * Create Topic
   * @route POST /topic
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {Topic.model} topic.body.required - Topic Details
   * @returns {object} 200 - Topic Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/topic", TopicController.createTopic);
  /**
   * @typedef Chapter
   * @property {string} title.required - this is name of the chapter
   * @property {string} school_id - this is id of the School
   * @property {string} description - this is brief description about chapter
   * @property {string} icon - icon for the Chapter
   * @property {integer} display_order - this is order in which Chapter to be displayed
   */
  /**
   * Create Chapter
   * @route POST /chapter
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {Chapter.model} chapter.body.required - Chapter Details
   * @returns {object} 200 - Chapter Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/chapter", ChapterController.createChapter);
  /**
   * @typedef Activity
   * @property {string} tag.required - Tags related to activity
   * @property {string} name.required - this is name of the Activity
   * @property {string} type - Type of the Activity
   * @property {integer} limit - LU Limit for the topic
   * @property {integer} display_order - this is order in which Activities to be displayed
   * @property {string} icon - Image for the subject
   */
  /**
   * Create Activity
   * @route POST /activity
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {Activity.model} activity.body.required - Activity Details
   * @returns {object} 200 - Activity Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/activity", ActivityController.createActivity);
  /**
   * @typedef Subject
   * @property {string} subject.required - this is name of the School
   * @property {string} grade_id - Grade Id
   * @property {string} icon - Image for the subject
   * @property {integer} display_order - this is order in which Subjects to be displayed
   */
  /**
   * Create Subject
   * @route POST /subject
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {Subject.model} subject.body.required - Subject Details
   * @returns {object} 200 - Subject Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/subject", SubjectController.createSubject);
  /**
   * @typedef Student
   * @property {String} email - Email Id of the student
   * @property {String} first_name - Student First Name
   * @property {String} middle_name - Student Middle Name
   * @property {String} last_name - Student Last Name
   * @property {String} date_of_birth - Student DOB
   * @property {String} email - Student Email Id
   * @property {String} phone - Students phone
   * @property {String} city - Student residing city
   * @property {String} country - Student residing country
   */
  /**
   * Create Student
   * @route POST /student
   * @group Student - Student Operations
   * @param {Student.model} student.body.required - Grade Details
   * @returns {object} 200 - Student Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/student", StudentController.createStudent);
  /**
   * @typedef Student
   * @property {String} email - Email Id of the student
   */
  /**
   * Student Signin
   * @route POST /student/signin
   * @group Student - Student Operations
   * @param {Student.model} student.body.required - Student Details
   * @returns {object} 200 - Student Unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/student/signin", userController.signin);

  
   /**
   * Given the Student Id and Activity Id, This function let's you get LU's 
   * @route GET /student/{studentId}/activity/{activityId}/start
   * @group Student - Student Operations
   * @param {string} studentId.path.required - Student Id
   * @param {string} activityId.path.required - Actitivity Id
   * @returns {object} 200 - LU's associated with Student and Activity ID
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/student/:studentId/activity/:activityId/start")
    .get(studentActivityController.startPracticeActivity);
  /**
   * Given the Student Id This function let's you get Most recent subject that student viewed
   * @route GET /student/{studentId}/subject/recent
   * @group Student - Student Operations
   * @param {string} studentId.path.required - Student Id
   * @returns {object} 200 - Top 3 Most recent Subjects viewed by student
   * @returns {Error}  default - Unexpected error
   */
  app
    .route("/student/:studentId/subject/recent")
    .get(studentActivityController.getRecentViewedSubjects);

  /**
   * @typedef SubjectChapter
   * @property {integer} unit.required - Unit number
   * @property {String} chapter_id.required - Chapter Id
   * @property {String} subject_id.required - Chapter Id
   * @property {String} school_id.required - School Id
   * @property {integer} display_order - Order which Subject to display
   */
  /**
   * Subject Chapter Relation
   * @route POST /subject/chapter
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {SubjectChapter.model} subjectchapter.body.required - Subject Chapter Model
   * @returns {object} 200 - Unique row Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/subject/chapter", chapterController.subjectChapter);
  /**
   * @typedef ChapterTopic
   * @property {String} chapter_id.required - Chapter Id
   * @property {integer} unit.required - Unit Id
   * @property {String} topic_id.required - Topic Unique Id
   * @property {integer} weight.required - Weightage for the topic
   * @property {integer} display_order.required - Display Order of the topic
   */
  /**
   * Chapter  Topic Association
   * @route POST /chapter/topic
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {ChapterTopic.model} chaptertopic.body.required - Chapter Topic Model
   * @returns {object} 200 - Chapter Topic unique Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/chapter/topic", TopicController.chapterTopic);
  /**
   * @typedef TopicActivity
   * @property {String} topic_id.required - Topic Id
   * @property {String} display_order.required - Display Order
   * @property {String} limit.required
   * @property {String} unit.required
   * @property {String} weight.required
   * @property {String} activity_id.required
   */
  /**
   * Topic Activity
   * @route POST /topic/activity
   * @group Curriculum - Operations to bulid/view Curriculum
   * @param {TopicActivity.model} topicactivity.body.required - Topic Activity
   * @returns {object} 200 - Activity Session Id
   * @returns {Error}  default - Unexpected error
   */
  app.post("/topic/activity", ActivityController.topicActivity);
};
