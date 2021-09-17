const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('correlation_user_player_discoguild', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'disco_users',
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
    discoGuildId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'disco_guilds',
        key: 'id'
      }
    },
    toBeDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'correlation_user_player_discoguild',
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
        name: "FK_correlation_user_player_discoguild_userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "FK_correlation_user_player_discoguild_playerId",
        using: "BTREE",
        fields: [
          { name: "playerId" },
        ]
      },
      {
        name: "FK_correlation_user_player_discoguild_disco_guilds",
        using: "BTREE",
        fields: [
          { name: "discoGuildId" },
        ]
      },
    ]
  });
};
