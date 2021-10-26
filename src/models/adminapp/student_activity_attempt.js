const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_activity_attempt', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'student',
        key: 'id'
      }
    },
    activity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'topic_activity',
        key: 'id'
      }
    },
    questionnaire_ids: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attempt: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    finish_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    iscomplete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student_activity_attempt',
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
      // {
      //   name: "student_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "student_id" },
      //   ]
      // },
      // {
      //   name: "activity_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "activity_id" },
      //   ]
      // },
    ]
  });
};
