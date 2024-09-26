'use strict';
const {
  Model,
} = require('sequelize');

const STATUS = {
  contratado: 1,
  desativado: 2,
}

module.exports = (sequelize, DataTypes) => {
  class Projeto_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projeto_Usuario.init({
    funcao: DataTypes.STRING,
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    status:{
      type: DataTypes.STRING,
      values: Object.values(STATUS)
    },
    salario: DataTypes.NUMBER,
    projeto_id: DataTypes.UUIDV4,
    user_id: DataTypes.UUIDV4,
    profile_id: DataTypes.UUIDV4,
  }, {
    sequelize,
    modelName: 'Projeto_Usuario',
  });


  Projeto_Usuario.associate = models => {
    Projeto_Usuario.belongsTo(models.User, { foreignKey: 'user_id'});
    Projeto_Usuario.belongsTo(models.Project, { foreignKey: 'projeto_id' });
    Projeto_Usuario.belongsTo(models.Profile, { foreignKey: 'profile_id' });
    Projeto_Usuario.hasMany(models.Tarefa, {foreignKey: 'responsavel_id', as: 'responsavel_projeto_usuario'})
    Projeto_Usuario.hasMany(models.Tarefa_Usuario, {foreignKey:'user_id', as: 'user_tarefa_usuario'})
  }

return Projeto_Usuario;
};