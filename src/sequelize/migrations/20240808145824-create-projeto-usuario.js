'use strict';

const { DataTypes } = require('sequelize');

const STATUS = {
  contratado: 1,
  desativado: 2,
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projeto_Usuario', {
      id: {
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      funcao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM,
        values: Object.values(STATUS),
        allowNull: false,
      },
      salario: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      projeto_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Projetos',
          key: 'id',
        },
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
      },
      profile_id: {
        type: Sequelize.UUID,
        references: {
          model: 'profiles',
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projeto_Usuario');
  },
};
