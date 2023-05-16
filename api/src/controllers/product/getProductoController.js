const { Product, Supplier, Category_product, Review, User } = require("../../db");
const axios = require("axios");
const { error } = require("console");
const { Op } = require("sequelize");
const { loadCategoryProduct } = require("../../libs/initialCharge/cargueDeCategorias")

const query = {//no es necesario listar los atributos, ya los trae
  include: [
    {
      model: Category_product,
      attributes: ["family", "name", "image"],
      required: true,
    },
    {
      model: Review,
      attributes: ["comments", "scoring"],
      // include: [
      //   {
      //     model: User,
      //     attributes: ["name", "email"]
      //   }
      // ]
    }
  ],
}

const getAllProducts = async () => {
  // buscar en la bbd
  const databaseProducts = await Product.findAll(query);


  return databaseProducts;
};

const searchProductByName = async (nombre) => {
  const databaseProducts = await Product.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${nombre}%`,
          },
        },
        {
          brand: {
            [Op.iLike]: `%${nombre}%`,
          },
        }
      ]

    },
    ...query
  });

  return [...databaseProducts];
};

const getProductById = async (idProduct) => {
  console.log(idProduct)
  const dbdata = await Product.findByPk(idProduct, query);

  if (!dbdata) throw new Error('Ese id no existe')

  return dbdata;
};

const getAllCategorias = async () => {
  const todasLasCategorias = await Category_product.findAll({ raw: true });

  if (todasLasCategorias.length) {
    return todasLasCategorias;
  } else {
    await loadCategoryProduct()
    //  const todasLasCategorias2 = await Category_product.findAll({ raw: true });
    //  return todasLasCategorias2;
  }
};




module.exports = {
  getAllProducts,
  searchProductByName,
  getProductById,
  getAllCategorias,
};
