const { Router } = require("express");
const { getAllVentasHandler, getAllVentasUsuarioHandler} = require("../handlers/ventas/getVenta")
const { postVentaHandler } = require("../handlers/ventas/postVenta")

const router = Router();

router.get("/", getAllVentasHandler)
router.get("/usuario", getAllVentasUsuarioHandler)
router.post("/", postVentaHandler)
module.exports = router;