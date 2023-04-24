const { getPagos, getPagosAdmin_Comercio } = require("../../controllers/pagos/getPagoController")


const getAllPagosHandler = async (req, res, next) => {

    try {
        const results = await getPagos()

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const getAllPagosAdmin_ComercioHandler = async (req, res, next) => {
    const { idComercio } = req.query;

    try {
        const results = await getPagosAdmin_Comercio(idComercio)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllPagosHandler, getAllPagosAdmin_ComercioHandler
}