'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarefa.init({
    id: DataTypes.UUIDV4,
    title: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_fim: DataTypes.DATE,
    categoria_id: DataTypes.UUIDV4,
    responsavel_id: DataTypes.UUIDV4
  }, {
    sequelize,
    modelName: 'Tarefa',
  });

Tarefa.associate = models => {
  Tarefa.belongsTo(models.User, { foreignKey: 'responsavel_id'});
  Tarefa.hasMany(models.Tarefa_Usuario, { foreignKey: 'tarefa_usuario_id'});
}
  
  return Tarefa;
};