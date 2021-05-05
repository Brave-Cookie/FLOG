var DataTypes = require("sequelize").DataTypes;
var _sys_config = require("./sys_config");
var _test = require("./test");

function initModels(sequelize) {
  var sys_config = _sys_config(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);


  return {
    sys_config,
    test,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
