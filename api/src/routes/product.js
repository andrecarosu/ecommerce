const { Router } = require("express");
const { getAllProductsHandler, getProductByIdHandler } = require("../handlers/product/getProductsHandler");
const { postProductHandler } = require("../handlers/product/postProductHandler");

//const { crearCalificacion, obtenerCalificaciones } = require("../controllers/motivoCalificacion/motivoCalificacionController")
const { putProductHandler, borradoLogicoHandler } = require("../handlers/product/putProductHandler")
//const { putProductHandler } = require('../handlers/product/putProduct')



const router = Router();

router.get("/", getAllProductsHandler);
router.get("/:idProduct", getProductByIdHandler);
router.post("/", postProductHandler);
//router.put("/delete/:id_producto", borradoLogicoHandler);

router.put("/:idProduct", putProductHandler)

//router.put('/', putProductHandler)


module.exports = router;
