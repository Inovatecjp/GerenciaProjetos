'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarefa_Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associações
      Tarefa_Usuario.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Tarefa_Usuario.belongsTo(models.Tarefa, { foreignKey: 'tarefa_id', as: 'tarefa' });
    }
  }

  Tarefa_Usuario.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      tarefa_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tarefa_Usuario',
      tableName: 'Tarefas_Usuarios', // Define o nome da tabela explicitamente
      timestamps: true, // Ativa campos createdAt e updatedAt
    }
  );

  return Tarefa_Usuario;
};
