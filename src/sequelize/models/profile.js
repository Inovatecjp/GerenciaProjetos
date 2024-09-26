'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile.init({
    id: {
      type: DataTypes.UUID, allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    name:         { type: DataTypes.STRING, allowNull: true },
    description:  { type: DataTypes.TEXT, allowNull: false, unique: true },
    isAdmin:      { type: DataTypes.BOOLEAN, allowNull: false, default: false }  }, {
    sequelize,
    modelName: 'Profile',
  });

  Profile.associate = models => {
    Profile.hasMany(models.profile_grant, { foreignKey: 'profile_id' });
  }
  return Profile;
};