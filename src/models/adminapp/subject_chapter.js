const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subject_chapter', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    chapter_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'chapter',
        key: 'id'
      }
    },
    subject_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'subject',
        key: 'id'
      }
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
    tableName: 'subject_chapter',
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
      //   name: "subject_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "subject_id" },
      //   ]
      // },
      // {
      //   name: "school_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "school_id" },
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
