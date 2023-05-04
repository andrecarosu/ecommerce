const { getVenta, getVentasUsuario,getDetalle_Venta } = require("../../controllers/order/getOrderController")


const getAllVentasHandler = async (req, res, next) => {

    try {
        const results = await getVenta()

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const getAllVentasUsuarioHandler = async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const results = await getVentasUsuario(user_id)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

const getDetalleVentaHandler = async (req, res, next) => {
    const { order_id } = req.params;

    try {
        const results = await getDetalle_Venta(order_id)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllVentasHandler, getAllVentasUsuarioHandler,getDetalleVentaHandler
}