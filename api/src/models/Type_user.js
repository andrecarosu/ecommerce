const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Type_user', {
      id_type: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
          },
    name: {
      type: DataTypes.STRING(50), 
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'Type_user',
    timestamps: false 
});
};

