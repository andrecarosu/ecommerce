const { Producto } = require("../../db");

const createProduct = async (
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
) => {
  const newProduct = await Producto.create({
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
  });

  return newProduct;
};

module.exports = { createProduct };
