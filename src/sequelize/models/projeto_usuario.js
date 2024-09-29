'use strict';
const { Model } = require('sequelize');

const STATUS = {
  contratado: 1,
  desativado: 2,
};

module.exports = (sequelize, DataTypes) => {
  class Projeto_Usuario extends Model {
    static associate(models) {
      // Definindo associações
      Projeto_Usuario.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'usuario',
      });
      Projeto_Usuario.belongsTo(models.Projeto, {
        foreignKey: 'projeto_id',
        as: 'projeto',
      });
      Projeto_Usuario.belongsTo(models.Profile, {
        foreignKey: 'profile_id',
        as: 'profile',
      });
      Projeto_Usuario.hasMany(models.Tarefa, {
        foreignKey: 'responsavel_id',
        as: 'responsavel_projeto_usuario',
      });
      Projeto_Usuario.hasMany(models.Tarefa_Usuario, {
        foreignKey: 'user_id',
        as: 'user_tarefa_usuario',
      });
    }
  }

  Projeto_Usuario.init(
    {
      funcao: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      data_fim: {
        type: DataTypes.DATE,
        allowNull: true, // Campo opcional
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(STATUS),
        allowNull: false,
      },
      salario: {
        type: DataTypes.FLOAT, // Corrigido para FLOAT, pois DataTypes.NUMBER não é um tipo padrão do Sequelize
        allowNull: false,
      },
      projeto_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      profile_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Projeto_Usuario',
      tableName: 'Projetos_Usuarios', // Define o nome da tabela explicitamente
      timestamps: true, // Ativa campos createdAt e updatedAt
    }
  );

  return Projeto_Usuario;
};
