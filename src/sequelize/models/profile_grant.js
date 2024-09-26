'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile_Grant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profile_Grant.init({
    id:DataTypes.UUIDV4,
    grands_id: DataTypes.UUIDV4,
    profile_id: DataTypes.UUIDV4,
  }, {
    sequelize,
    modelName: 'Profile_Grant',
  });


  Profile_Grant.associate = models => {
    Profile_Grant.belongsTo(models.Grands, { foreignKey: 'grands_id' });
    Profile_Grant.belongsTo(models.Profile, { foreignKey: 'profile_id'});
  }

  return Profile_Grant;
};