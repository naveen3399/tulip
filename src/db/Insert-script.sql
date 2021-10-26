INSERT INTO `school` (
        `id`,
        `name`,
        `medium`,
        `address`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES (
        1,
        'Bharathi Matric Higher Secondary School',
        'English',
        'KPM',
        '1',
        NULL,
        '1',
        NULL
    );
INSERT INTO `grade` (
        `id`,
        `grade`,
        `school_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('2', 'Grade 2', '1', '1', '1', NULL, NULL, '2');
INSERT INTO `grade` (
        `id`,
        `grade`,
        `school_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('1', 'Grade 1', '1', '1', '1', NULL, NULL, '1');
INSERT INTO `grade` (
        `id`,
        `grade`,
        `school_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('3', 'Grade 3', '1', '1', '1', NULL, NULL, '3');
INSERT INTO `subject` (
        `id`,
        `subject`,
        `grade_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('1', 'Maths', '1', '1', '1', NULL, NULL, '1');
INSERT INTO `subject` (
        `id`,
        `subject`,
        `grade_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('2', 'English', '1', '1', '1', NULL, NULL, '2');
INSERT INTO `subject` (
        `id`,
        `subject`,
        `grade_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('3', 'Science', '1', '1', '1', NULL, NULL, '3');
INSERT INTO `subject` (
        `id`,
        `subject`,
        `grade_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('4', 'English', '2', '1', '1', NULL, NULL, '2');
INSERT INTO `subject` (
        `id`,
        `subject`,
        `grade_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('5', 'Maths', '2', '1', '1', NULL, NULL, '1');
INSERT INTO `subject` (
        `id`,
        `subject`,
        `grade_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`,
        `display_order`
    )
VALUES ('6', 'Science', '2', '1', '1', NULL, NULL, '3');
INSERT INTO `chapter` (
        `id`,
        `school_id`,
        `title`,
        `description`,
        `display_order`,
        `icon`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES (
        '1',
        '1',
        'Shapes',
        'Different types of shapes.',
        '1',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        '2',
        '1',
        'Number sense',
        'Numbers are explained',
        '2',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        '3',
        '1',
        'Addition',
        'Addition ariths',
        '3',
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );
INSERT INTO `topic` (
        `id`,
        `school_id`,
        `title`,
        `description`,
        `display_order`,
        `icon`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES (
        '1',
        '1',
        '2D shapes',
        '2D shapes',
        '1',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '2',
        '1',
        'Polygons',
        'Polygons',
        NULL,
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '3',
        '1',
        'Reflective Symmetry',
        'Reflective Symmetry',
        '3',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '4',
        '1',
        '3D shapes',
        '3D shapes',
        '4',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '5',
        '1',
        'Numbers upto 1000',
        'Numbers upto 1000',
        '5',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '6',
        '1',
        'Hundreds, Tens and Units',
        'Hundreds, Tens and Units',
        '6',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '7',
        '1',
        'Place value',
        'Place value',
        '7',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '8',
        '1',
        'Round 2 Digit numbers',
        'Round 2 Digit numbers',
        '8',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '9',
        '1',
        'Add Multiples of 10 and 100',
        'Add Multiples of 10 and 100',
        '9',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '10',
        '1',
        'Add 3 digits without regrouping',
        'Add 3 digits without regrouping',
        '10',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    );
INSERT INTO `chapter_topic` (
        `id`,
        `chapter_id`,
        `topic_id`,
        `display_order`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES ('1', '1', '1', '1', '1', '1', NULL, NULL),
    ('2', '1', '2', '2', '1', '1', NULL, NULL),
    ('3', '1', '3', '3', '1', '1', NULL, NULL),
    ('4', '1', '4', '4', '1', '1', NULL, NULL),
    ('5', '2', '5', '1', '1', '1', NULL, NULL),
    ('6', '2', '6', '2', '1', '1', NULL, NULL),
    ('7', '2', '7', '3', '1', '1', NULL, NULL),
    ('8', '2', '8', '4', '1', '1', NULL, NULL),
    ('9', '3', '9', '1', '1', '1', NULL, NULL),
    ('10', '3', '10', '2', '1', '1', NULL, NULL);
INSERT INTO `subject_chapter` (
        `id`,
        `chapter_id`,
        `subject_id`,
        `school_id`,
        `display_order`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES ('1', '1', '1', '1', '1', '1', '1', NULL, NULL),
    ('2', '2', '1', '1', '2', NULL, NULL, NULL, NULL),
    ('3', '3', '1', '1', '3', '1', '1', NULL, NULL);
INSERT INTO `activity` (
        `id`,
        `tag`,
        `name`,
        `display_order`,
        `icon`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES (
        '1',
        'Maths,addition,numbers',
        'Number Addition Problems',
        '1',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '2',
        'Maths,Multiplication,numbers',
        'Number MultiplicationProblems',
        '2',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    ),
    (
        '3',
        'Maths,Statement',
        'Statement Problem',
        '3',
        NULL,
        '1',
        '1',
        NULL,
        NULL
    );
INSERT INTO `topic_activity` (
        `id`,
        `topic_id`,
        `display_order`,
        `weight`,
        `activity_id`,
        `created_by`,
        `updated_by`,
        `created_on`,
        `updated_on`
    )
VALUES ('1', '5', '1', '30', '1', '1', '1', NULL, NULL),
    ('2', '5', '2', '30', '2', '1', '1', NULL, NULL),
    ('3', '5', '3', '40', '3', '1', '1', NULL, NULL);