const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grade', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    grade: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    school_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'school',
        key: 'id'
      }
    },
    display_order: {
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
    tableName: 'grade',
    timestamps: false,
    indexes: [
      {
        name: "grade_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "grade" },
        ]
      }
      // ,
      // {
      //   name: "school_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "school_id" },
      //   ]
      // },
    ]
  });
};
