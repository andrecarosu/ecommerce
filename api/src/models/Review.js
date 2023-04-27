const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    scoring: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    tableName: 'Review',
    timestamps: false 
  });
};