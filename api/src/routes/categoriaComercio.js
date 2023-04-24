const { Router } = require("express");
const router = Router();
const { getCategoriaComecioHandler } = require("../handlers/categoriaComercio/getCategoriaComercio")

router.get("/", getCategoriaComecioHandler)

module.exports = router;
