"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "customer",
      {
        id: {
          type: Sequelize.DataTypes.BIGINT,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        first_name: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false
        },
        last_name: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false
        },
        email: {
          type: Sequelize.DataTypes.STRING(150)
        },
        deleted: {
          type: Sequelize.DataTypes.BOOLEAN
        }
      },
      {
        freezeTableName: true,
        tableName: "customer",
        timestamps: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer')
  }
};
