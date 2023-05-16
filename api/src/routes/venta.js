const { Router } = require("express");
const { getAllVentasHandler} = require("../handlers/order/getOrder")
const { postVentaHandler } = require("../handlers/order/postOrder")
const { actualizarUsuarioHandler, putUserHandler } = require("../handlers/order/putOrderHandler")
const router = Router();

router.get("/", getAllVentasHandler)
router.post("/", postVentaHandler)
router.put("/",actualizarUsuarioHandler)
router.put("/:order_id",putUserHandler)
module.exports = router;