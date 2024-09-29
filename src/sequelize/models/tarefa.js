'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associações com outros modelos
      Tarefa.belongsTo(models.User, { foreignKey: 'responsavel_id', as: 'responsavel' });
      Tarefa.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
      Tarefa.hasMany(models.Tarefa_Usuario, { foreignKey: 'tarefa_id', as: 'tarefasUsuarios' });
    }
  }

  Tarefa.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: true, // Pode ser opcional
      },
      data_fim: {
        type: DataTypes.DATE,
        allowNull: true, // Pode ser opcional
      },
      categoria_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      responsavel_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tarefa',
      tableName: 'Tarefas', // Define o nome da tabela explicitamente
      timestamps: true, // Ativa campos createdAt e updatedAt
    }
  );

  return Tarefa;
};
