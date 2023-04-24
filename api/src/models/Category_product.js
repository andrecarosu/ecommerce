const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Category_product', {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    
  }, {
    tableName: 'Category_product',
    timestamps: false,
  });
}  