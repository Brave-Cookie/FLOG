const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_meeting', {
    meeting_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meeting_info',
        key: 'meeting_id'
      }
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'project_info',
        key: 'project_id'
      }
    }
  }, {
    sequelize,
    tableName: 'project_meeting',
    timestamps: false,
    indexes: [
      {
        name: "pm_mi_idx",
        using: "BTREE",
        fields: [
          { name: "meeting_id" },
        ]
      },
      {
        name: "pm_pi_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
