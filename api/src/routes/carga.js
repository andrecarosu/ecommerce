const { Router } = require("express");
const router = Router();
const { cargarBD } = require("../handlers/cargarBD")

router.get("/", cargarBD)

module.exports = router;
