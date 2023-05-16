const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "PerfilGoogle",
    {
      perfil_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        default: "https://cdn-icons-png.flaticon.com/512/711/711769.png",
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "PerfilGoogle",
      timestamps: false,
    }
  );
};
