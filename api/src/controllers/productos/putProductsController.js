const { Producto } = require("../../db")

const editProduct = async (nombre,
    id_producto,
    id_comercio,
    cantidad,
    descripcion_producto,
    existencia,
    fecha_final,
    fecha_inicial,
    imagen,
    id_categoria_producto,
    valor_normal,
    valor_con_descuento,
    condicion,) => {

    const editOneProduct = await Producto.update(
        {
            nombre,
            cantidad,
            descripcion_producto,
            existencia,
            fecha_final,
            fecha_inicial,
            imagen,
            id_categoria_producto,
            valor_normal,
            valor_con_descuento,
            condicion,
        },
        {
            where: { id_producto },
        }
    );

    return editOneProduct;
};
const borradoLogico = async (id_producto) => {
    const product = await Producto.update({estado:false},{where:{
        id_producto
    }
    })
  
    return product
}

module.exports = { editProduct, borradoLogico };