'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir associações com outros modelos
      Meta.belongsTo(models.Projeto, { foreignKey: 'projeto_id', as: 'projeto' });
      Meta.hasMany(models.Tarefa, { foreignKey: 'categoria_id', as: 'tarefas' });
    }
  }

  Meta.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      projeto_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      describe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'Categorias', // opcional: define o nome da tabela explicitamente
      timestamps: true, // ativa campos createdAt e updatedAt
    }
  );

  return Meta;
};
