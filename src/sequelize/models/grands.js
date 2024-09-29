'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grands extends Model {
    static associate(models) {
      // Definir as associações corretamente
      Grands.hasMany(models.ProfileGrant, { foreignKey: 'grant_id' });
    }
  }

  Grands.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    description: { type: DataTypes.STRING },
    method: { type: DataTypes.STRING, allowNull: false },
    route: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Grands',
    tableName: 'grants',
    underscored: true

  });

  return Grands;
};
