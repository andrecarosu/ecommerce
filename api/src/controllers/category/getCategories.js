const { Category_product } = require("../../db");
const { Op } = require("sequelize")

const getCategories = async ({ name, image }) => {

    const categories = await Category_product.findAll()

    return categories
}

module.exports = { getCategories }