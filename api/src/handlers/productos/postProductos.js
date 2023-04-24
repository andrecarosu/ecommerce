const {
  createProduct,
} = require("../../controllers/productos/postProductoController");
const {
  validacionPostProducto,
} = require("../validaciones/validacionproducto");

const postProductHandler = async (req, res) => {
  const {
    nombre,
    fecha_inicial,
    fecha_final,
    descripcion_producto,
    cantidad,
    existencia,
    valor_normal,
    valor_con_descuento,
    condicion,
    imagen,
    id_categoria_producto,
    id_comercio
  } = req.body;
  
  try {
    validacionPostProducto(req.body);

    const newProduct = await createProduct(
      nombre,
      fecha_inicial,
      fecha_final,
      descripcion_producto,
      cantidad,
      existencia,
      valor_normal,
      valor_con_descuento,
      condicion,
      imagen,
      id_categoria_producto,
      id_comercio
    );

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};



module.exports = { postProductHandler }
