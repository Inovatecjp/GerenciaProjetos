'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarefa_Usuario', {
      id: {
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUIDV4,
        references:{
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      tarefa_id: {
        type: Sequelize.UUIDV4,
        references: {
          model: 'Tarefas',
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('Tarefa_Usuario');
  }
};