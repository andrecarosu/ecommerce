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

const getAllFamilies = async () => {
    const getAllCategorias = await Category_product.findAll({ raw: true });//{family: , products:[{}]}
    const families = []
    const familiesAdded = []

    console.log(getAllCategorias)
    getAllCategorias.forEach(category => {
        const family = category.family
        if (!familiesAdded.includes(family)) {
            families.push({ family, categories: [] })
            familiesAdded.push(family)
        }

        families.forEach((f, index) => {
            if (f.family === family) {
                console.log(category.name)

                families[index].categories = [...families[index].categories, {

                    name: category.name,
                    image: category.image

                }]
                return
            }

        })




    });

    return families

}

module.exports = { getCategories, getAllFamilies }