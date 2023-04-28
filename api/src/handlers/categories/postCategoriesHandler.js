const { createCategory } = require('../../controllers/category/createCategory')

const postCategoryHandler = async (req, res) => {

    try {

        const newCategory = await createCategory(req.body)
        res.status(200).send('Registro exitoso')

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
module.exports = {
    postCategoryHandler
}