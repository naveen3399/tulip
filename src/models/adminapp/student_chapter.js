const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_chapter', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    chapter_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'subject_chapter',
        key: 'id'
      }
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'student',
        key: 'id'
      }
    },
    grade_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    updated_by: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student_chapter',
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
      //   name: "chapter_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "chapter_id" },
      //   ]
      // },
    ]
  });
};
