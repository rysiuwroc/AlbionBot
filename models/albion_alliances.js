const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albion_alliances', {
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
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
    },
    tag: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'albion_alliances',
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
        name: "FK_albion_alliances_albion_founders",
        using: "BTREE",
        fields: [
          { name: "founderId" },
        ]
      },
    ]
  });
};
