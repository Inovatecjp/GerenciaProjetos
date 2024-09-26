'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grands.init({
    id:     {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
  },       
  description: {type: DataTypes.STRING},
  method: {type: DataTypes.STRING, allowNull: false},
  route:          { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Grands',
  });

  Grands.associate = models => {
    Grands.hasMany(models.profile_grant, { foreignKey: 'grands_id'});
  }
  return Grands;
};