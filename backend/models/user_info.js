const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_info', {
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    user_pw: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_info',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
