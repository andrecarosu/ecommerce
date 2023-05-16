const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Detail_order", {
    detail_order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

     unit_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.BOOLEAN
    },
  },
    {
      tableName: 'Detail_order',
      timestamps: false
    });
};