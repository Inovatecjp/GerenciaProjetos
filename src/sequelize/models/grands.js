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
  grant:          { type: DataTypes.STRING, allowNull: true },
  
  note:           { type: DataTypes.TEXT, allowNull: true },
  filterableRoute:{ type: DataTypes.STRING, allowNull: true, },
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