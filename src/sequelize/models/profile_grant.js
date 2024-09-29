'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProfileGrant extends Model {
    static associate(models) {
      ProfileGrant.belongsTo(models.Profile, { as: 'profiles', foreignKey: 'profile_id' });
      ProfileGrant.belongsTo(models.Grands, { as: 'grant', foreignKey: 'grant_id' });
            }
  }

  ProfileGrant.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    status: DataTypes.STRING,
    profile_id: DataTypes.UUID,
    grant_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProfileGrant',
    tableName: 'profile_grant', // Adjust if table name is different
    underscored: true
  });

  return ProfileGrant;
};
