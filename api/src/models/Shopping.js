const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Shopping", {
    id_shopping: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
     date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    value_shopping: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  },
    {
      tableName: 'Shopping',
      timestamps: false
    });
};
