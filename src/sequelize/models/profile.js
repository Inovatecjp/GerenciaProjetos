'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.hasMany(models.ProfileGrant, { foreignKey: 'profiles_id' });
    }
  }

  Profile.init({
    id: {
      type: DataTypes.UUID, 
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false, unique: true },
    isAdmin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    sequelize, 
    tableName: 'profiles',
    modelName: 'Profile',
    underscored: true
  });

  return Profile;
};
