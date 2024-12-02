"use strict";
const { DataTypes } = require("sequelize");

const STATUS = {
  nao_iniciado: "nao_iniciado",
  em_andamento: "em_andamento",
  finalizado: "finalizado",
  paralisado: "paralisado",
  cancelado: "cancelado",
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projetos", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      descricao: {
        type: Sequelize.STRING,
      },
      orcamento: {
        type: Sequelize.FLOAT,
      },
      data_inicio: {
        type: Sequelize.DATE,
      },
      data_fim: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM,
        values: Object.values(STATUS),
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
    await queryInterface.dropTable("Projetos");
  },
};
