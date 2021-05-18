const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log_info', {
    meeting_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    log_time: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    log_feeling: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    log_text: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'log_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
};
