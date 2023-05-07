const { putProductController } = require('../../controllers/product/putProductController')
const handlerHttpError = require('../../middlewares/handlerHttpError')

const putProductHandler = async (req, res, next) => {
    try {
        const { product_id } = req.params
        const product = req.body

        const controller = await putProductController(product_id, product)

        res.status(201).send(controller)

    } catch (error) {
        handlerHttpError(res, error.message, 500)
    }
}

module.exports = { putProductHandler }