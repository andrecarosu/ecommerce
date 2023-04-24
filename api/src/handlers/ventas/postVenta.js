const { createVenta, createDetalleVenta } = require("../../controllers/ventas/postVentaController");
const { getDetalle_Venta, } = require("../../controllers/ventas/getVentaController");
const { createPago, } = require("../../controllers/pagos/postPagoController");

const postVentaHandler = async (req, res) => {

    const {
        fecha,
        valor_total_venta,
        id_usuario,
        detalle_venta
    } = req.body;
    // console.log(1, req.body)
    try {

        const [resultVenta, resultPago] = await Promise.all([
            createVenta(
                fecha,
                valor_total_venta,
                id_usuario

            ),
            createPago(
                detalle_venta

            )
        ])

        console.log(6, resultVenta, resultPago, "resultVenta, resultPago")
        const idVenta = await createDetalleVenta(
            resultPago,
            resultVenta
        )
        console.log(10, idVenta)
        const result = await getDetalle_Venta(
            idVenta

        )

        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postVentaHandler,
};