const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albion_players', {
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    albionName: {
      type: DataTypes.STRING(50),
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
          { name: "albionGuildId" },
        ]
      },
    ]
  });
};
