const { getCategories, getAllFamilies } = require('../../controllers/category/getCategories')

const getCategoriesHandler = async (req, res) => {

    try {
        const Categories = await getCategories()
        res.status(200).send(Categories)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getFamiliesHandler = async (req, res) => {

    try {
        const allFamilies = await getAllFamilies()
        res.status(200).send(allFamilies)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


module.exports = {
    getCategoriesHandler,
    getFamiliesHandler
}