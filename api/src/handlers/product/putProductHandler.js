const { putProductController } = require('../../controllers/product/putProductController')
const handlerHttpError = require('../../middlewares/handlerHttpError')

const putProductHandler = async (req, res, next) => {
    try {
        const { idProduct } = req.params
        const product = req.body

        const controller = await putProductController(idProduct, product)

        res.status(201).send(controller)

    } catch (error) {
        handlerHttpError(res, 500, error.message)
    }
}

module.exports = { putProductHandler }