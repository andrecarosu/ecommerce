const { Category_product } = require("../../db");
const { Op } = require("sequelize")

const createCategory = async ({ name, image, family }) => {
    const categoryExistent = await Category_product.findOne({
        where: {
            name: {
                [Op.iLike]: `%${name}%`,
            },
        }
    })

    if (categoryExistent) {
        throw new Error('Esa Categoria ya existe')
    }

    const category = await Category_product.create({
        name,
        image,
        family
    })

    return category
}

module.exports = { createCategory }