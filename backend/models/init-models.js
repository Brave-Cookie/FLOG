var DataTypes = require("sequelize").DataTypes;
var _log_info = require("./log_info");
var _meeting_info = require("./meeting_info");
var _project_info = require("./project_info");
var _project_issue = require("./project_issue");
var _project_meeting = require("./project_meeting");
var _test = require("./test");
var _user_info = require("./user_info");
var _user_project = require("./user_project");

function initModels(sequelize) {
  var log_info = _log_info(sequelize, DataTypes);
  var meeting_info = _meeting_info(sequelize, DataTypes);
  var project_info = _project_info(sequelize, DataTypes);
  var project_issue = _project_issue(sequelize, DataTypes);
  var project_meeting = _project_meeting(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);
  var user_info = _user_info(sequelize, DataTypes);
  var user_project = _user_project(sequelize, DataTypes);

  log_info.belongsTo(meeting_info, { as: "meeting", foreignKey: "meeting_id"});
  meeting_info.hasMany(log_info, { as: "log_infos", foreignKey: "meeting_id"});
  project_meeting.belongsTo(meeting_info, { as: "meeting", foreignKey: "meeting_id"});
  meeting_info.hasMany(project_meeting, { as: "project_meetings", foreignKey: "meeting_id"});
  project_issue.belongsTo(project_info, { as: "project", foreignKey: "project_id"});
  project_info.hasMany(project_issue, { as: "project_issues", foreignKey: "project_id"});
  project_meeting.belongsTo(project_info, { as: "project", foreignKey: "project_id"});
  project_info.hasMany(project_meeting, { as: "project_meetings", foreignKey: "project_id"});
  user_project.belongsTo(project_info, { as: "project", foreignKey: "project_id"});
  project_info.hasMany(user_project, { as: "user_projects", foreignKey: "project_id"});
  log_info.belongsTo(user_info, { as: "user", foreignKey: "user_id"});
  user_info.hasMany(log_info, { as: "log_infos", foreignKey: "user_id"});
  user_project.belongsTo(user_info, { as: "user", foreignKey: "user_id"});
  user_info.hasMany(user_project, { as: "user_projects", foreignKey: "user_id"});

  return {
    log_info,
    meeting_info,
    project_info,
    project_issue,
    project_meeting,
    test,
    user_info,
    user_project,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
