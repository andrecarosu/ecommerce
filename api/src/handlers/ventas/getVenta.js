const { getVenta, getVentasUsuario } = require("../../controllers/ventas/getVentaController")


const getAllVentasHandler = async (req, res, next) => {

    try {
        const results = await getVenta()

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const getAllVentasUsuarioHandler = async (req, res, next) => {
    const { idUsuario } = req.query;

    try {
        const results = await getVentasUsuario(idUsuario)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllVentasHandler, getAllVentasUsuarioHandler
}