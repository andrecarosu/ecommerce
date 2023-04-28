const { Category_product } = require("../../db");
const { Op } = require("sequelize")

const getCategories = async () => {

    try {
        const dataUser = await Category_product.findAll({
          attributes: [
            "category_id",
            "name",
            "image",
            "family",
          ]
        });
        const results = [...dataUser];
        return results;
      } catch (error) {
        console.error(error);
      }
}

module.exports = { getCategories }