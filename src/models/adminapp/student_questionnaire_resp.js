const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_questionnaire_resp', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    student_activity_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    student_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    activity_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    question_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    revision_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    hints_viewed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    solution_viewed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    useranswer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student_questionnaire_resp',
    timestamps: false,
    indexes: [
      // {
      //   name: "PRIMARY",
      //   unique: true,
      //   using: "BTREE",
      //   fields: [
      //     { name: "id" },
      //   ]
      // },
    ]
  });
};
