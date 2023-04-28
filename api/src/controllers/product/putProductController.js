const { Product, Supplier } = require("../../db");
const { Op } = require("sequelize")


<<<<<<< HEAD
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
=======
const putProductController = async (product_id, productUpdate) => {


>>>>>>> fdace7882ca623f93693a208c0df01b1b6d040bd
    try {
        // Verifica si hay datos para actualizar
        if (!productUpdate || Object.keys(productUpdate).length === 0) {
            throw new Error('No se proporcionaron datos de actualizacion')
        }
        // Actualiza los campos específicos del producto en la base de datos
        const [filasActualizadas, [productoActualizado]] = await Product.update(productUpdate, {
<<<<<<< HEAD
            where: { idProduct },
            returning: true // Devuelve el registro actualizado
=======
          where: { product_id },
          returning: true // Devuelve el registro actualizado
>>>>>>> fdace7882ca623f93693a208c0df01b1b6d040bd
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