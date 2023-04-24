const { Producto } = require("../../db");



const putProductController = async (producto) => {

    try {
        if (!producto || Object.keys(producto).length === 0) {
            throw new Error('No se proporcionó nueva cantidad de stock para actualización')
        } else {

            console.log('CONTROLLER', producto)

            for (let i = 0; i < producto.length; i++) {
                Producto.update(
                    {
                        existencia: producto[i].nuevoStock
                    },
                    {
                        where: { id_producto: producto[i].id_producto }
                    }
                )                
            }
            return "Producto/s actualizado"
        }
    } catch (error) {
        return error
    }
}

module.exports = { putProductController }