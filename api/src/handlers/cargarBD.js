const { getAllCities } = require("../controllers/ciudades/getCiudadController");
const { getAllCategorias } = require("../controllers/productos/getProductoController")
const { getCategoriaComecio } = require("../controllers/categorias_comercio/getCategoriaComercioController")
const { getAndCreateCommerce } = require("../controllers/comercios/getComercioController");
const { loadProducts } = require('../controllers/productos/cargeDeProductos');


const cargarBD = async (req, res) => {

    try {
        const results = await getAllCities();
        const results1 = await getAllCategorias();
        const results2 = await getCategoriaComecio()
        const results3 = await getAndCreateCommerce()
        const results4 = await loadProducts();
    
        res.status(200).json("cargado!");
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    cargarBD,
};