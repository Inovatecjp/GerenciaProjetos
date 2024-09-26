'use strict';
const {
  Model
} = require('sequelize');

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
    id: DataTypes.UUIDV4,
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: Object.values(STATUS)
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