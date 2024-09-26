'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarefa_Usuario', {
      id: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUIDV4,
        references:{
          model: 'User',
          key: 'id'
        },
        allowNull: false
      },
      tarefa_id: {
        type: Sequelize.UUIDV4,
        references: {
          model: 'Projeto',
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