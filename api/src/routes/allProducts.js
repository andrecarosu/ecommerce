const {Router} = require("express");
const {postAllProductsHandler} = require('../handlers/product/postAllProducts');


const router = Router();

router.post("/",postAllProductsHandler);

module.exports = router;