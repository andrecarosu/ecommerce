const { putProductController } = require('../../controllers/product/putProductController')

const putProductHandler = async (req, res, next) => {
    try {
        const { idProduct } = req.params
        const product = req.body

        const controller = await putProductController(idProduct, product)

        res.status(201).send(controller)

    } catch (error) {
        next(error)
    }
}

module.exports = { putProductHandler }