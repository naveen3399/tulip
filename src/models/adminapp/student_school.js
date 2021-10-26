const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_school', {
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
        model: 'school',
        key: 'id'
      }
    },
    school_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    grade_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'grade',
        key: 'id'
      }
    },
    join_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedOn: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student_school',
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
      //   name: "grade_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "grade_id" },
      //   ]
      // },
    ]
  });
};
