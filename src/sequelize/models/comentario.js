'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir associação com Tarefa_Usuario
      Comentario.belongsTo(models.Tarefa_Usuario, { foreignKey: 'tarefa_user_id', as: 'tarefaUsuario' });
    }
  }

  Comentario.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      texto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tarefa_user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comentario',
      tableName: 'Comentarios', // opcional: define o nome da tabela explicitamente
      timestamps: true, // ativa campos createdAt e updatedAt
    }
  );

  return Comentario;
};
