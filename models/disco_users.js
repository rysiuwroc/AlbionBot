const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('disco_users', {
    id: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    usernameTag: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "usernameTag"
    }
  }, {
    sequelize,
    tableName: 'disco_users',
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
        name: "usernameTag",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usernameTag" },
        ]
      },
    ]
  });
};
