const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('topic_activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    topic_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'topic',
        key: 'id'
      }
    },
    display_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    activity_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'activity',
        key: 'id'
      }
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
    tableName: 'topic_activity',
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
      //   name: "topic_id",
      //   using: "BTREE",
      //   fields: [
      //     { name: "topic_id" },
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
