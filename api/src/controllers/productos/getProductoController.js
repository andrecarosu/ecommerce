const { Product, Supplier, Category_product, Review, User } = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");


const getAllProducts = async () => {
  // buscar en la bbd
  const databaseProducts = await Product.findAll({//no es necesario listar los atributos, ya los trae
    include: [
      {
        model: Category_product,
        attributes: ["name", "image"],
        required: true,
      },
      {
        model: Supplier,
        attributes: ["name", "supplier_id"]
      },
    ],
  });
  return databaseProducts;
};

const searchProductByName = async (nombre) => {
  const databaseProducts = await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${nombre}%`,
      },
    },
    include: [
      {
        model: Category_product,
        attributes: ["name", "image"],
        required: true,
      },
      {
        model: Supplier,
        attributes: ["name", "supplier_id"]
      },
    ],
  });

  return [...databaseProducts];
};

const getProductById = async (idProduct) => {

  const dbdata = await Product.findByPk(idProduct, {
    include: [
      {
        model: Supplier,
        attributes: ["name", "supplier_id"]
      },
    ],
  });

  return dbdata;
};

const getAllCategorias = async () => {
  let categorias = [
    {
      nombre_categoria_producto: "Indumentaria",
      imagen_categoria_producto:
        "https://media.ambito.com/p/6f5d891ba726a94d0a32b461085e5a84/adjuntos/239/imagenes/038/124/0038124118/1200x675/smart/ropa-indumentariajpg.jpg",
    },
    {
      nombre_categoria_producto: "Electrodomésticos",
      imagen_categoria_producto: "https://vivirmejor.mx/wp-content/uploads/2020/09/Renueva-electrodomesticos_0.jpg",
    },
    {
      nombre_categoria_producto: "Informática",
      imagen_categoria_producto:
        "https://concepto.de/wp-content/uploads/2014/10/hardware-e1551046878558.jpg",
    },
    {
      nombre_categoria_producto: "Cosmética",
      imagen_categoria_producto:
        "https://www.aquateknica.com/wp-content/uploads/2020/02/calidad-cosmeticos-aq-instruments-1024x718.jpg",
    },
    {
      nombre_categoria_producto: "Alimentos",
      imagen_categoria_producto:
        "https://gastronomicainternacional.com/wp-content/uploads/2020/06/que-son-alimentos-no-perecederos-1-min.jpg",
    },
    {
      nombre_categoria_producto: "Juguetes",
      imagen_categoria_producto:
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71saY5E2z5L._AC_SX679_.jpg",
    },
    {
      nombre_categoria_producto: "Muebles",
      imagen_categoria_producto:
        "https://www.distribucionactualidad.com/wp-content/uploads/2018/01/MUEBLES.jpg",
    },
    {
      nombre_categoria_producto: "Jardinería",
      imagen_categoria_producto:
        "https://thumbs.dreamstime.com/b/herramientas-de-jardiner%C3%ADa-sobre-un-fondo-plano-madera-plana-vista-la-parte-superior-165590766.jpg",
    },
    {
      nombre_categoria_producto: "Deportes",
      imagen_categoria_producto:
        "https://proyectocoqui.org/wp-content/uploads/2022/10/En-que-hay-que-fijarse-al-comprar-ropa-de-deporte.jpg",
    },
    {
      nombre_categoria_producto: "Joyería",
      imagen_categoria_producto:
        "https://images7.alphacoders.com/421/421542.jpg",
    },
    {
      nombre_categoria_producto: "Herramientas",
      imagen_categoria_producto:
        "https://png.pngtree.com/thumb_back/fh260/background/20210910/pngtree-toolbox-labor-wrench-screwdriver-manual-photography-map-with-map-image_839810.jpg",
    }
  ];
  let categoriasGuardadas = [];
  const todasLasCategorias = await Categoria_producto.findAll({ raw: true });

  if (todasLasCategorias.length) {
    //console.log("todasLasCategorias", todasLasCategorias);
    return todasLasCategorias;
  } else {
    for (let i = 0; i < categorias.length; i++) {
      const categoriaGuardada = await Categoria_producto.create(categorias[i]);
      categoriasGuardadas.push(categoriaGuardada);
    }
    // console.log("categoriasGuardadas", categoriasGuardadas);-
    return categoriasGuardadas;
  }
};

module.exports = {
  getAllProducts,
  searchProductByName,
  getProductById,
  getAllCategorias,
};
