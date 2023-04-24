const { Router } = require("express");
const categoriasRouter = Router();
const { getCategoriasHandler} = require("../handlers/productos/getProductos")

categoriasRouter.get("/", getCategoriasHandler)

module.exports = categoriasRouter;
