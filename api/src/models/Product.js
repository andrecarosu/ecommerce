const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      normal_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount_price: {
        type: DataTypes.FLOAT,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },     

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
      },
      
    },
    {
      tableName: "Product",
     
    }
  );
};
