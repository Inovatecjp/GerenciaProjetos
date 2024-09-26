'use strict';

const STATUS = {
  nao_iniciado: 1,
  em_andamento: 2,
  finalizado: 3,
  paralisado: 4,
  cancelado: 5
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projetos', {
      id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      orcamento: {
        type: Sequelize.NUMBER
      },
      data_inicio: {
        type: Sequelize.DATE
      },
      data_fim: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM,
        values: Object.values(STATUS)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projetos');
  }
};