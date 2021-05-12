const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log_info', {
    meeting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meeting_info',
        key: 'meeting_id'
      }
    },
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'user_info',
        key: 'user_id'
      }
    },
    log_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    log_feeling: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    log_text: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'log_info',
    timestamps: false,
    indexes: [
      {
        name: "li_mi_idx",
        using: "BTREE",
        fields: [
          { name: "meeting_id" },
        ]
      },
      {
        name: "li_ui_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
