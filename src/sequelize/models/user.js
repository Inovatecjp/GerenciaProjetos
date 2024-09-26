'use strict';
const { Model, DataTypes } = require('sequelize');

STATUS = {
  contratado: 0,
  desativado: 1,
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, // Mark id as the primary key
    },
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: Object.values(STATUS),
    },
    email: DataTypes.STRING,
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = models => {
    User.belongsTo(models.Profile, {foreignKey: 'profile_id'})
    User.hasMany(models.Projeto_Usuario, { foreignKey: 'user_id' });
  }

  return User;
};
