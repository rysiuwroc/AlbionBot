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
        model: 'albion_alliances',
        key: 'id'
      }
    },
    adminChannelId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    registerChannelId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    defaultRoleId: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    allowUsersStatusId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "allow only guild, allow alliance, allow everyone",
      references: {
        model: 'settings_usermode_statuses',
        key: 'id'
      }
    },
    tagModeStatusId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      comment: "guild abrev, alliance, abrev",
      references: {
        model: 'settings_tagmode_statuses',
        key: 'id'
      }
    },
    aliasModeStatusId: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      references: {
        model: 'settings_aliasmode_statuses',
        key: 'id'
      }
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false
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
        name: "FK_disco_guilds_albionAllianceId",
        using: "BTREE",
        fields: [
          { name: "albionAllianceId" },
        ]
      },
      {
        name: "FK_disco_guilds_tagTypeStatusId",
        using: "BTREE",
        fields: [
          { name: "tagModeStatusId" },
        ]
      },
      {
        name: "FK_disco_guilds_settings_aliasmode_statuses",
        using: "BTREE",
        fields: [
          { name: "aliasModeStatusId" },
        ]
      },
    ]
  });
};
