CREATE TABLE `student` (
  `id` bigint PRIMARY KEY,
  `first_name` bigint,
  `middle_name` varchar(255),
  `last_name` varchar(255),
  `date_of_birth` datetime,
  `email` varchar(255),
  `phone` varchar(255),
  `city` varchar(255),
  `country` varchar(255),
  `createdBy` bigint,
  `updatedBy` bigint,
  `createdOn` datetime,
  `updatedOn` datetime
);

CREATE TABLE `student_school` (
  `id` bigint PRIMARY KEY,
  `student_id` bigint,
  `school_id` bigint,
  `grade_id` bigint,
  `join_date` datetime,
  `active` boolean,
  `createdOn` datetime,
  `updatedOn` datetime
);

CREATE TABLE `student_activity_attempt` (
  `id` bigint PRIMARY KEY,
  `student_id` bigint,
  `activity_id` bigint,
  `questionnaire_ids` varchar(255),
  `attempt` bigint,
  `start_time` datetime,
  `finish_time` datetime,
  `iscomplete` boolean
);

CREATE TABLE `student_questionnaire_resp` (
  `id` bigint PRIMARY KEY,
  `student_activity_id` bigint,
  `student_id` bigint,
  `activity_id` bigint,
  `question_id` bigint,
  `revision_id` bigint,
  `hints_viewed` boolean,
  `solution_viewed` datetime,
  `answer` varchar(255),
  `useranswer` varchar(255),
  `score` float,
  `success` boolean
);

CREATE TABLE `chapter` (
  `id` bigint PRIMARY KEY,
  `school_id` bigint,
  `title` varchar(255),
  `description` varchar(255),
  `display_order` integer,
  `icon` varchar(255),
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `topic_activity` (
  `id` bigint PRIMARY KEY,
  `topic_id` bigint,
  `display_order` integer,
  `limit` integer,
  `unit` integer,
  `weight` integer,
  `activity_id` bigint,
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `topic` (
  `id` bigint PRIMARY KEY,
  `school_id` bigint,
  `title` varchar(255),
  `description` varchar(255),
  `display_order` int,
  `icon` varchar(255),
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `activity` (
  `id` bigint PRIMARY KEY,
  `tag` varchar(255),
  `name` varchar(255),
  `display_order` int,
  `type` ENUM ('LEARNING_UNIT', 'PRACTICE_UNIT'),
  `icon` varchar(255),
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `chapter_topic` (
  `id` bigint PRIMARY KEY,
  `chapter_id` bigint,
  `unit` integer,
  `topic_id` bigint,
  `weight` integer,
  `display_order` int,
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `subject` (
  `id` bigint PRIMARY KEY,
  `subject` varchar(255),
  `grade_id` bigint,
  `display_order` int,
  `icon` varchar(255),
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `subject_chapter` (
  `id` bigint PRIMARY KEY,
  `unit` integer,
  `chapter_id` bigint,
  `subject_id` bigint,
  `school_id` bigint,
  `display_order` int,
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `school` (
  `id` bigint PRIMARY KEY,
  `name` varchar(255),
  `medium` varchar(255),
  `address` varchar(255),
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `grade` (
  `id` bigint PRIMARY KEY,
  `grade` varchar(255),
  `school_id` bigint,
  `display_order` int,
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

CREATE TABLE `student_chapter` (
  `id` bigint PRIMARY KEY,
  `chapter_id` bigint,
  `student_id` bigint,
  `grade_id` bigint,
  `progress` int,
  `created_by` bigint,
  `updated_by` bigint,
  `created_on` datetime,
  `updated_on` datetime
);

ALTER TABLE `topic_activity` ADD FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`);

ALTER TABLE `chapter_topic` ADD FOREIGN KEY (`topic_id`) REFERENCES `topic` (`id`);

ALTER TABLE `chapter_topic` ADD FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`);

ALTER TABLE `subject_chapter` ADD FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`);

ALTER TABLE `subject_chapter` ADD FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

ALTER TABLE `chapter` ADD FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

ALTER TABLE `topic` ADD FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

ALTER TABLE `subject_chapter` ADD FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`);

ALTER TABLE `grade` ADD FOREIGN KEY (`school_id`) REFERENCES `school` (`id`);

ALTER TABLE `subject` ADD FOREIGN KEY (`grade_id`) REFERENCES `grade` (`id`);

ALTER TABLE `topic_activity` ADD FOREIGN KEY (`activity_id`) REFERENCES `activity` (`id`);

ALTER TABLE `student_school` ADD FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

ALTER TABLE `student_chapter` ADD FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

ALTER TABLE `student_chapter` ADD FOREIGN KEY (`chapter_id`) REFERENCES `subject_chapter` (`id`);

ALTER TABLE `student_activity_attempt` ADD FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

ALTER TABLE `student_activity_attempt` ADD FOREIGN KEY (`activity_id`) REFERENCES `topic_activity` (`id`);

ALTER TABLE `student_school` ADD FOREIGN KEY (`student_id`) REFERENCES `school` (`id`);

ALTER TABLE `student_school` ADD FOREIGN KEY (`grade_id`) REFERENCES `grade` (`id`);
