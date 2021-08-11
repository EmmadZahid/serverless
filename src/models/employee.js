const { DataTypes } = require("sequelize");
const getSequelize = require("../config/database");

const Employee = getSequelize().define(
  "employee",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    tableName: 'employee',
    timestamps: false
  }
);

module.exports = Employee