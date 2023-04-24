const { Router } = require("express");
const { getAllPagosHandler, getAllPagosAdmin_ComercioHandler} = require("../handlers/pagos/getPagos")

const { putEstadoPagosHandler } = require("../handlers/pagos/putPagos")

const router = Router();

router.get("/", getAllPagosHandler)
router.get("/comercio", getAllPagosAdmin_ComercioHandler)
router.put("/", putEstadoPagosHandler)
module.exports = router;