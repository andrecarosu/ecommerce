const { Router } = require("express");
const { getAllVentasHandler, getAllVentasUsuarioHandler} = require("../handlers/order/getOrder")
const { postVentaHandler } = require("../handlers/order/postOrder")
const { actualizarUsuarioHandler, putUserHandler } = require("../handlers/order/putOrderHandler")
const router = Router();

router.get("/", getAllVentasHandler)
router.get("/:user_id", getAllVentasUsuarioHandler)
router.post("/", postVentaHandler)
router.put("/",actualizarUsuarioHandler)
router.put("/:order_id",putUserHandler)
module.exports = router;