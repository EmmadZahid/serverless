"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "employee",
          "customer_id",
          Sequelize.DataTypes.BIGINT,
          {
            transaction: t
          }
        ),
        queryInterface.addConstraint("employee", {
          fields: ["customer_id"],
          type: "foreign key",
          name: 'customer_id_fkey',
          references: {
            table: "customer",
            field: "id"
          },
          transaction: t
        }),
        queryInterface.dropTable("project", { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable(
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
                model: "customer",
                key: "id"
              }
            },
            employee_id: {
              type: Sequelize.DataTypes.BIGINT,
              references: {
                model: "employee",
                key: "id"
              }
            }
          },
          {
            freezeTableName: true,
            tableName: "project",
            timestamps: false,
            transaction: t
          }          
        ),
        queryInterface.removeConstraint("employee", "customer_id_fkey", {
          transaction: t
        }),
        queryInterface.removeColumn("employee", "customer_id", {
          transaction: t
        })
      ]);
    });
  }
};
