'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comentario.init({
    id: DataTypes.UUIDV4,
    texto: DataTypes.STRING,
    tarefa_user_id: DataTypes.UUIDV4,
  },{
    timestamps: true,

  }, {
    sequelize,
    modelName: 'Comentario',
  });

Comentario.associate = models => {
  Comentario.belongsTo(models.Tarefa_Usuario, {foreignKey: 'tarefa_user_id'})
}

  return Comentario;
};