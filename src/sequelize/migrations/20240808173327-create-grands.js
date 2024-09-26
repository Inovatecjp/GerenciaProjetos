'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('grants', {
        id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV1    
        },
        description:            { type: Sequelize.DataTypes.TEXT, allowNull: true },
        method :   { type: Sequelize.DataTypes.STRING, allowNull: false},
        route:           { type: Sequelize.DataTypes.STRING, allowNull: false },
        created_at:      { type: Sequelize.DataTypes.DATE, allowNull: false },
        updated_at:      { type: Sequelize.DataTypes.DATE, allowNull: false }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('grants');
  }
};