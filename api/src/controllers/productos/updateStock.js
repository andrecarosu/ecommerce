const { Producto } = require("../../db");

const updateStock = async (product) => {
    const id_producto = product.id_producto
    const nuevoStock = {
        existencia: product.cantidad
    }

    const actualizacion = await Producto.update(nuevoStock, {
        where: { id_producto },
        returning: true // Devuelve el registro actualizado
    });

    return actualizacion
}

module.exports = { updateStock }