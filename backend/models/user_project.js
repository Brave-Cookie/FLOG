const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_project', {
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'user_info',
        key: 'user_id'
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
    tableName: 'user_project',
    timestamps: false,
    indexes: [
      {
        name: "up_ui_idx",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "up_pi_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
