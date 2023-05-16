const { createVenta, createDetalleVenta } = require("../../controllers/order/postOrderController");
const { getDetalle_Venta } = require("../../controllers/order/getOrderController");

const postVentaHandler = async (req, res) => {
    const {
        date,
        total,
        state,
        detail_order
    } = req.body;
    console.log(1, req.body)
    try {
        const newVenta = await createVenta(date, total, state, detail_order);
        console.log(200, newVenta);
        const idVenta = await createDetalleVenta(detail_order, newVenta.order_id, state);
        console.log(10, idVenta);
        const result = await getDetalle_Venta(newVenta.order_id);
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postVentaHandler,
};
