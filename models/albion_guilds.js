const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albion_guilds', {
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    allianceId: {
      type: DataTypes.STRING(25),
      allowNull: true,
      references: {
        model: 'albion_alliances',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    founderId: {
      type: DataTypes.STRING(25),
      allowNull: false,
      references: {
        model: 'albion_founders',
        key: 'id'
      }
    },
    foundationDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'albion_guilds',
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
        name: "FK_albion_guilds_allianceId",
        using: "BTREE",
        fields: [
          { name: "allianceId" },
        ]
      },
      {
        name: "FK_albion_guilds_founderId",
        using: "BTREE",
        fields: [
          { name: "founderId" },
        ]
      },
    ]
  });
};
