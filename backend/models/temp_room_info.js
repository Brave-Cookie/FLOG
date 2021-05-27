const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('temp_room_info', {
    room_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    meeting_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'temp_room_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_code" },
        ]
      },
    ]
  });
};
