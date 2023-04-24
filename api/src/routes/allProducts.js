const {Router} = require("express");
const {postAllProductsHandler} = require('../handlers/productos/postAllProducts');


const router = Router();

router.post("/",postAllProductsHandler);

module.exports = router;