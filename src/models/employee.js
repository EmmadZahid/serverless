const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Employee = sequelize.define(
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
    },
    customer_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'cutomer',
        key: "id"
      }
    }
  },
  {
    freezeTableName: true,
    tableName: 'employee',
    timestamps: false
  }
);

module.exports = Employee