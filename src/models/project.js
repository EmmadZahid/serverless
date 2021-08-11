const { DataTypes } = require("sequelize");
const getSequelize = require("../config/database");

const Project = getSequelize().define(
  "project",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    customer_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'customer',
        key: "id"
      }
    },
    employee_id: {
      type: DataTypes.BIGINT,
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

module.exports = Project;
