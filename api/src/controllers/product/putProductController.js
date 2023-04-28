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
        if (!productUpdate || Object.keys(productUpdate).length === 0) {
            throw new Error('No se proporcionaron datos de actualizacion')
        } else {

            const product = await Product.findOne({ where: { product_id: idProduct } })
            if (!product) {
                throw new Error('El producto no existe')
            }


            await product.update(
                {
                    name,
                    normal_price,
                    discount_price,
                    description,
                    stock,
                    image,
                    brand,
                    state
                }
            )

            if (suppilerName) {

                const supplierSearch = await Supplier.findOne({
                    where: {
                        name: {
                            [Op.iLike]: `%${suppilerName}%`,
                        },
                    }
                })
                if (supplierSearch) {
                    await product.setSupplier(supplierSearch)
                } else {
                    throw new Error('No existe')
                }
            }



            return "Producto/s actualizado"
        }
    } catch (error) {
        return error
    }
}

module.exports = { putProductController }