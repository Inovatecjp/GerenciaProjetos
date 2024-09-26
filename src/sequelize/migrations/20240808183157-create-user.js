'use strict';
const { DataTypes } = require('sequelize');

STATUS = {
  contratado: 0,
  desativado: 1,
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,      
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf:{
        type: Sequelize.STRING,
        allowNull: false
      },
      profile_id: {
        type: Sequelize.DataTypes.UUID,
        references: { model: 'Profiles', key: 'id' }
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM,
        values: Object.values(STATUS),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hashed_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};