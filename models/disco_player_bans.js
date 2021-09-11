const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disco_player_bans', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    guildId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'albion_guilds',
        key: 'id'
      }
    },
    playerId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'albion_players',
        key: 'id'
      }
    },
    reason: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    bannedByUserId: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'disco_player_bans',
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
        name: "FK_disco_player_bans_albion_guilds",
        using: "BTREE",
        fields: [
          { name: "guildId" },
        ]
      },
      {
        name: "FK_disco_player_bans_albion_players",
        using: "BTREE",
        fields: [
          { name: "playerId" },
        ]
      },
    ]
  });
};
