'use strict';

const { DataTypes } = require('sequelize');

const STATUS = {
  contratado: 1,
  desativado: 2,
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projeto_Usuario', {
      funcao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: false

      },
      status: {
        type: Sequelize.STRING,
        values: Object.values(STATUS)
      },
      salario: {
        type: Sequelize.NUMBER
      },
      projeto_id: {
        type: Sequelize.UUIDV4,
        references: {
          model: 'Projeto',
          key: 'id'
        },        
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUIDV4,
        references:{
          model: 'User',
          key: 'id'
        },
        allowNull: false
      },
      profile_id: {
        type: Sequelize.UUIDV4,
        references:{
          model: 'Profile',
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
    await queryInterface.dropTable('Projeto_Usuario');
  }
};