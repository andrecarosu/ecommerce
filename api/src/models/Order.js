const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    state: {
      type: DataTypes.BOOLEAN
    },

  },
  
    {
      tableName: 'Order',
      timestamps: false
    });
}