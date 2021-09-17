const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albion_players', {
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    guildId: {
      type: DataTypes.STRING(25),
      allowNull: true,
      references: {
        model: 'albion_guilds',
        key: 'id'
      }
    },
    allianceId: {
      type: DataTypes.STRING(25),
      allowNull: true,
      references: {
        model: 'albion_alliances',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    lastChecked: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'albion_players',
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
        name: "FK_albion_players_albionGuildId",
        using: "BTREE",
        fields: [
          { name: "guildId" },
        ]
      },
      {
        name: "FK_albion_players_albion_alliances",
        using: "BTREE",
        fields: [
          { name: "allianceId" },
        ]
      },
    ]
  });
};
