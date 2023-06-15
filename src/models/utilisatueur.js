const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilisatueur', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    prenom: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    telephone: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "utilisateur_mdp_unique"
    },
    photo_profile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fritte_alloco: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mdp: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'utilisatueur',
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
    ]
  });
};
