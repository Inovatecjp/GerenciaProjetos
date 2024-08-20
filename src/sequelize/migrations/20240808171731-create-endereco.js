// 'use strict';

// const { DataTypes } = require('sequelize');

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('enderecos', {
//       id: {
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.UUIDV4
//       },
//       rua:{
//         type: Sequelize.STRING,
//       },
//       cep:{
//         type: Sequelize.STRING,
//       },
//       bairro:{
//         type: Sequelize.STRING,
//       },
//       uf:{
//         type: Sequelize.STRING,
//       },
//       complemento: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       user: {
//         type: Sequelize.UUIDV4,
//         references: {
//           model: 'Users',
//           key: 'id'
//         },
//         allowNull: false
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('enderecos');
//   }
// };