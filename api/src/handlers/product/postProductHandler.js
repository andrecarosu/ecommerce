const {
    createProduct,
} = require("../../controllers/product/postProductoController");
const handlerHttpError = require('../../middlewares/handlerHttpError')
const validacionProducto = require("../validaciones/valdiacionProducto");

const postProductHandler = async (req, res) => {
    // const {
    //   nombre,
    //   fecha_inicial,
    //   fecha_final,
    //   descripcion_producto,
    //   cantidad,
    //   existencia,
    //   valor_normal,
    //   valor_con_descuento,
    //   condicion,
    //   imagen,
    //   id_categoria_producto,
    //   id_comercio
    // } = req.body;

    try {
        validacionProducto(req.body);
        console.log(req.body)
        const newProduct = await createProduct(req.body)

        res.status(200).json(newProduct);
    } catch (error) {
        handlerHttpError(res, error.message, 500)
    }

};



module.exports = { postProductHandler }
