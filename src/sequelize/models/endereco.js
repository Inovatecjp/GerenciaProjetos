'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Endereco extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associação com o modelo User
      Endereco.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }

  Endereco.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      rua: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complemento: {
        type: DataTypes.STRING,
        allowNull: true, // Campo opcional
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Endereco',
      tableName: 'Enderecos', // Define o nome da tabela explicitamente
      timestamps: true, // Ativa campos createdAt e updatedAt
    }
  );

  return Endereco;
};
