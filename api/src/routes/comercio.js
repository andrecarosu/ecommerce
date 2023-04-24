const { Router } = require("express");
const { getAllCommerceHandler, getByNameHandler, getByEmailHandler, getByIdHandler, loginCommerce } = require("../handlers/comercios/getComercio")
const { postCommerceHandler } = require("../handlers/comercios/postComercio.js")
const { putCommerceHandler } = require("../handlers/comercios/putComercio")
const {loginHandler} = require('../handlers/comercios/loginHandler')

const router = Router();

router.get("/", getAllCommerceHandler)
router.get("/byName", getByNameHandler)
router.get("/byEmail", getByEmailHandler)
router.get("/:id_comercio", getByIdHandler)
router.get("/login", loginCommerce)
router.post("/loginCommerce",loginHandler )
router.post("/", postCommerceHandler)
router.put("/", putCommerceHandler)
module.exports = router;