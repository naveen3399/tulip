const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chapter_topic', {
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
        model: 'chapter',
        key: 'id'
      }
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    topic_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'topic',
        key: 'id'
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'chapter_topic',
    timestamps: false,
    indexes: [
      // {
      //   name: "chapter_index",
      //   unique: true,
      //   using: "BTREE",
      //   fields: [
      //     { name: "id" },
      //   ]
      // },
      {
        name: "topic_id",
        using: "BTREE",
        fields: [
          { name: "topic_id" },
        ]
      },
      {
        name: "chapter_id",
        using: "BTREE",
        fields: [
          { name: "chapter_id" },
        ]
      },
    ]
  });
};
