const { getCategoriaComecio } = require("../../controllers/categorias_comercio/getCategoriaComercioController")


const getCategoriaComecioHandler = async (req, res) => {

    try {
        const results = await getCategoriaComecio()
        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCategoriaComecioHandler
}