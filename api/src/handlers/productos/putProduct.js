const { putProductController } = require('../../controllers/productos/putProductController')

const putProductHandler = async (req, res, next) => {
    try {
        const product = req.body

        const controller = await putProductController(product)

        res.status(201).send(controller)

    } catch (error) {
        next(error)
    }
}

module.exports = { putProductHandler }