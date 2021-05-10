var DataTypes = require("sequelize").DataTypes;
var _sys_config = require("./sys_config");
var _test = require("./test");
var _user_info = require("./user_info");

function initModels(sequelize) {
  var sys_config = _sys_config(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);
  var user_info = _user_info(sequelize, DataTypes);


  return {
    sys_config,
    test,
    user_info,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
