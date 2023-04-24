const { editPagos } = require("../../controllers/pagos/putPagoController");


const putEstadoPagosHandler = async (req, res, next) => {
    const {  idPago } = req.query

    try {
       const results = await editPagos(idPago)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

module.exports = {
    putEstadoPagosHandler
}