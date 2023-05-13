const { getVenta, getVentasUsuario,getDetalle_Venta } = require("../../controllers/order/getOrderController")


const getAllVentasHandler = async (req, res, next) => {
const {email} = req.query
    try {
        const results = email? await getVentasUsuario(email) : await getVenta()

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
    getAllVentasHandler, getDetalleVentaHandler
}