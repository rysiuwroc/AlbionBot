var DataTypes = require("sequelize").DataTypes;
var _albion_alliance = require("./albion_alliance");
var _albion_founders = require("./albion_founders");
var _albion_guilds = require("./albion_guilds");
var _albion_players = require("./albion_players");
var _correlation_user_player_discoguild = require("./correlation_user_player_discoguild");
var _disco_guilds = require("./disco_guilds");
var _disco_player_bans = require("./disco_player_bans");
var _disco_users = require("./disco_users");
var _settings_allowusers_statuses = require("./settings_allowusers_statuses");
var _settings_tagtype_statuses = require("./settings_tagtype_statuses");
var _settings_taguse_statuses = require("./settings_taguse_statuses");

function initModels(sequelize) {
  var albion_alliance = _albion_alliance(sequelize, DataTypes);
  var albion_founders = _albion_founders(sequelize, DataTypes);
  var albion_guilds = _albion_guilds(sequelize, DataTypes);
  var albion_players = _albion_players(sequelize, DataTypes);
  var correlation_user_player_discoguild = _correlation_user_player_discoguild(sequelize, DataTypes);
  var disco_guilds = _disco_guilds(sequelize, DataTypes);
  var disco_player_bans = _disco_player_bans(sequelize, DataTypes);
  var disco_users = _disco_users(sequelize, DataTypes);
  var settings_allowusers_statuses = _settings_allowusers_statuses(sequelize, DataTypes);
  var settings_tagtype_statuses = _settings_tagtype_statuses(sequelize, DataTypes);
  var settings_taguse_statuses = _settings_taguse_statuses(sequelize, DataTypes);

  albion_guilds.belongsTo(albion_alliance, { as: "alliance", foreignKey: "allianceId"});
  albion_alliance.hasMany(albion_guilds, { as: "albion_guilds", foreignKey: "allianceId"});
  disco_guilds.belongsTo(albion_alliance, { as: "albionAlliance", foreignKey: "albionAllianceId"});
  albion_alliance.hasMany(disco_guilds, { as: "disco_guilds", foreignKey: "albionAllianceId"});
  albion_guilds.belongsTo(albion_founders, { as: "founder", foreignKey: "founderId"});
  albion_founders.hasMany(albion_guilds, { as: "albion_guilds", foreignKey: "founderId"});
  albion_players.belongsTo(albion_guilds, { as: "albionGuild", foreignKey: "albionGuildId"});
  albion_guilds.hasMany(albion_players, { as: "albion_players", foreignKey: "albionGuildId"});
  correlation_user_player_discoguild.belongsTo(albion_guilds, { as: "guild", foreignKey: "guildId"});
  albion_guilds.hasMany(correlation_user_player_discoguild, { as: "correlation_user_player_discoguilds", foreignKey: "guildId"});
  disco_guilds.belongsTo(albion_guilds, { as: "albionGuild", foreignKey: "albionGuildId"});
  albion_guilds.hasMany(disco_guilds, { as: "disco_guilds", foreignKey: "albionGuildId"});
  disco_player_bans.belongsTo(albion_guilds, { as: "guild", foreignKey: "guildId"});
  albion_guilds.hasMany(disco_player_bans, { as: "disco_player_bans", foreignKey: "guildId"});
  correlation_user_player_discoguild.belongsTo(albion_players, { as: "player", foreignKey: "playerId"});
  albion_players.hasMany(correlation_user_player_discoguild, { as: "correlation_user_player_discoguilds", foreignKey: "playerId"});
  disco_player_bans.belongsTo(albion_players, { as: "player", foreignKey: "playerId"});
  albion_players.hasMany(disco_player_bans, { as: "disco_player_bans", foreignKey: "playerId"});
  correlation_user_player_discoguild.belongsTo(disco_users, { as: "user", foreignKey: "userId"});
  disco_users.hasMany(correlation_user_player_discoguild, { as: "correlation_user_player_discoguilds", foreignKey: "userId"});
  disco_guilds.belongsTo(settings_allowusers_statuses, { as: "allowUsersStatus", foreignKey: "allowUsersStatusId"});
  settings_allowusers_statuses.hasMany(disco_guilds, { as: "disco_guilds", foreignKey: "allowUsersStatusId"});
  disco_guilds.belongsTo(settings_tagtype_statuses, { as: "tagTypeStatus", foreignKey: "tagTypeStatusId"});
  settings_tagtype_statuses.hasMany(disco_guilds, { as: "disco_guilds", foreignKey: "tagTypeStatusId"});
  disco_guilds.belongsTo(settings_taguse_statuses, { as: "tagUseStatus", foreignKey: "tagUseStatusId"});
  settings_taguse_statuses.hasMany(disco_guilds, { as: "disco_guilds", foreignKey: "tagUseStatusId"});

  return {
    albion_alliance,
    albion_founders,
    albion_guilds,
    albion_players,
    correlation_user_player_discoguild,
    disco_guilds,
    disco_player_bans,
    disco_users,
    settings_allowusers_statuses,
    settings_tagtype_statuses,
    settings_taguse_statuses,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
