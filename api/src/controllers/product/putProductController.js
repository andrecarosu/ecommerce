const { Product, Supplier } = require("../../db");
const { Op } = require("sequelize")


const putProductController = async (idProduct, productUpdate) => {
    const {
        name,
        normal_price,
        discount_price,
        description,
        stock,
        image,
        brand,
        state,
        categories,
        suppilerName } = productUpdate
    //supplier es el name
    try {
        // Verifica si hay datos para actualizar
        if (!productUpdate || Object.keys(productUpdate).length === 0) {
            throw new Error('No se proporcionaron datos de actualizacion')
        }
        // Actualiza los campos específicos del producto en la base de datos
        const [filasActualizadas, [productoActualizado]] = await Product.update(productUpdate, {
            where: { idProduct },
            returning: true // Devuelve el registro actualizado
        });

        // Verifica si el producto se actualizó correctamente
        if (filasActualizadas === 0) {
            throw new Error("No se encontró el producto especificado");
        }

        // Retorna el producto actualizado
        return productoActualizado;
    } catch (error) {
        // Manejo de errores
        throw new Error("Ocurrió un error al actualizar el producto: " + error.message);
    }
};

module.exports = { putProductController }