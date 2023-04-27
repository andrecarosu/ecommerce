const { Product, Supplier } = require("../../db");
const { Op } = require("sequelize")

const createProduct = async ({
  name,
  normal_price,
  discount_price,
  description,
  stock,
  image,
  brand,
  state,
  categories,
  suppilerName

}) => {
  const productExistent = await Product.findOne({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    }
  })

  if (productExistent) {
    throw new Error('Este producto ya existe')
  }

  const newProduct = await Product.create({
    name,
    normal_price,
    discount_price,
    description,
    stock,
    image,
    brand,
    state,
  });
  const supplierSearch = await Supplier.findOne({
    where: {
      name: {
        [Op.iLike]: `%${suppilerName}%`,
      },
    }
  })
  if (supplierSearch) {
    await newProduct.setSupplier(supplierSearch)
  }


  return newProduct;
};

module.exports = { createProduct };
