const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_issue', {
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'project_info',
        key: 'project_id'
      }
    },
    issue_content: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'project_issue',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
      {
        name: "project_id_idx",
        using: "BTREE",
        fields: [
          { name: "project_id" },
        ]
      },
    ]
  });
};
