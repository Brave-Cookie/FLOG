const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_config', {
    variable: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    set_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    set_by: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sys_config',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "variable" },
        ]
      },
    ]
  });
};
