const { searchProductByName, getAllProducts, getProductById, getAllCategorias } = require("../../controllers/product/getProductoController")
const handlerHttpError = require('../../middlewares/handlerHttpError')

const getAllProductsHandler = async (req, res, next) => {
    const { name } = req.query;
    try {
        const results = name ? await searchProductByName(name) : await getAllProducts()

        res.status(200).json(results)
    } catch (error) {
        handlerHttpError(res, error.message, 500)
    }

}

const getProductByIdHandler = async (req, res, next) => {
    const { product_id } = req.params // idProducto = product_id
    try {
        const ProductId = await getProductById(product_id)
        res.status(200).json(ProductId)
    } catch (error) {
        console.log('wow', error)
        handlerHttpError(res, error.message, 500)
    }
}



module.exports = {
    getAllProductsHandler,
    getProductByIdHandler

}