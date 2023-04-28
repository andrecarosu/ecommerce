const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// const comment = sequelize.define('comment', {
//   author: DataTypes.STRING,
//   text: DataTypes.STRING
// });

module.exports = (sequelize) => {
  sequelize.define("Review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
      set({ comment, comment_id }) {

        let comments = this.getDataValue('comments')
        if (comments == undefined && !comment_id) {

          this.setDataValue('comments', [{ id: 0, comment }])
        } else if (!comment_id) {
          const length = comments.length
          this.setDataValue('comments', [...comments, { id: comments[length - 1].id + 1, comment: comment }]);
        } else {
          comments = comments.filter((c) => c.id != comment_id)
          this.setDataValue('comments', comments)
        }

      }
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