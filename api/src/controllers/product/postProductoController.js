const { Product, Supplier, Category_product } = require("../../db");
const handlerHttpError = require('../../middlewares/handlerHttpError')
const { Op } = require("sequelize")

const createProduct = async ({
  name,
  normal_price,
  discount_price,
  description,
  stock,
  amount,
  image,
  brand,
  state,
  category,
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
    amount,
    image,
    brand,
    state
  });

  console.log(category)
  const categorySearch = await Category_product.findOne({
    where: {
      name: {
        [Op.iLike]: `%${category}%`,
      },
    }
  })

  console.log(categorySearch)


  if (categorySearch) {
    await newProduct.setCategory_product(categorySearch)
  }


  return newProduct;
};

module.exports = { createProduct };