'use strict';
const {
  Model
} = require('sequelize');
const tarefa = require('./tarefa');
module.exports = (sequelize, DataTypes) => {
  class Tarefa_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarefa_Usuario.init({
    id: DataTypes.UUIDV4,
    user_id: DataTypes.UUIDV4,
    tarefa_id: DataTypes.UUIDV4
  }, {
    sequelize,
    modelName: 'Tarefa_Usuario',
  });

Tarefa_Usuario.associate = models => {
  Tarefa_Usuario.belongsTo(models.User, {foreignKey: 'user_id'})
  Tarefa_Usuario.belongsTo(models.Tarefa, {foreignKey: 'tarefa_id'})
}

  return Tarefa_Usuario;
};