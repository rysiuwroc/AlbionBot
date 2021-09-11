const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disco_guilds', {
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    guildName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    albionGuildId: {
      type: DataTypes.STRING(25),
      allowNull: true,
      references: {
        model: 'albion_guilds',
        key: 'id'
      }
    },
    albionAllianceId: {
      type: DataTypes.STRING(25),
      allowNull: true,
      references: {
        model: 'albion_alliance',
        key: 'id'
      }
    },
    adminChannelId: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    defaultRoleId: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    allowUsersStatusId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "allow only guild, allow alliance, allow everyone",
      references: {
        model: 'settings_allowusers_statuses',
        key: 'id'
      }
    },
    tagUseStatusId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "make tag, dont make tag, make tag only for guild, make tag only for alliance",
      references: {
        model: 'settings_taguse_statuses',
        key: 'id'
      }
    },
    tagTypeStatusId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      comment: "guild abrev, alliance, abrev",
      references: {
        model: 'settings_tagtype_statuses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'disco_guilds',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_disco_guilds_albionGuildId",
        using: "BTREE",
        fields: [
          { name: "albionGuildId" },
        ]
      },
      {
        name: "FK_disco_guilds_allowUsersStatusId",
        using: "BTREE",
        fields: [
          { name: "allowUsersStatusId" },
        ]
      },
      {
        name: "FK_disco_guilds_tagTypeStatusId",
        using: "BTREE",
        fields: [
          { name: "tagTypeStatusId" },
        ]
      },
      {
        name: "FK_disco_guilds_tagUseStatusId",
        using: "BTREE",
        fields: [
          { name: "tagUseStatusId" },
        ]
      },
      {
        name: "FK_disco_guilds_albionAllianceId",
        using: "BTREE",
        fields: [
          { name: "albionAllianceId" },
        ]
      },
    ]
  });
};
