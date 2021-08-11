"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "employee",
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
          type: Sequelize.DataTypes.STRING(150),
          allowNull: false
        }
      },
      {
        freezeTableName: true,
        tableName: "employee",
        timestamps: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employee')
  }
};
