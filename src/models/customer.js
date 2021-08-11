const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Customer = sequelize.define(
  "customer",
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
      type: DataTypes.STRING(150)
    },
    deleted: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    freezeTableName: true,
    tableName: 'customer',
    timestamps: false
  }
);

module.exports = Customer