const {Router} = require("express");
const router = Router();
const {getAllCitiesHandler} = require("../handlers/ciudades/getCitiesHandler");

router.get("/", getAllCitiesHandler);


module.exports = router;