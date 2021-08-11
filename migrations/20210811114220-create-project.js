"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "project",
      {
        id: {
          type: Sequelize.DataTypes.BIGINT,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.DataTypes.STRING(50),
          allowNull: false
        },
        customer_id: {
          type: Sequelize.DataTypes.BIGINT,
          references: {
            model: 'customer',
            key: "id"
          }
        },
        employee_id: {
          type: Sequelize.DataTypes.BIGINT,
          references: {
            model: 'employee',
            key: "id"
          }
        }
      },
      {
        freezeTableName: true,
        tableName: "project",
        timestamps: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('employee')
  }
};
