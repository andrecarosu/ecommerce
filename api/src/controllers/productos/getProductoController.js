const { Producto, Comercio, Categoria_producto } = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");


const getAllProducts = async () => {
  // buscar en la bbd
  const databaseProducts = await Producto.findAll({
    attributes: [
      "id_producto",
      "fecha_inicial",
      "fecha_final",
      "descripcion_producto",
      "cantidad",
      "existencia",
      "valor_normal",
      "valor_con_descuento",
      "condicion",
      "estado",
      "imagen",
      "nombre",
      "createdAt"
    ],
    include: [
      {
        model: Categoria_producto,
        attributes: ["nombre_categoria_producto", "imagen_categoria_producto"],
        required: true,
      },
      { model: Comercio, attributes: ["nombre_comercio", "id_comercio"] },
    ],
  });
  return databaseProducts;
};

const searchProductByName = async (nombre) => {
  const databaseProducts = await Producto.findAll({
    where: {
      nombre: {
        [Op.iLike]: `%${nombre}%`,
      },
    },
    include: [
      {
        model: Categoria_producto,
        attributes: ["nombre_categoria_producto", "imagen_categoria_producto"],
        required: true,
      },
      { model: Comercio, attributes: ["nombre_comercio"] },
    ],
  });

  return [...databaseProducts];
};

const getProductById = async (idProduct) => {
  // let ProductInfo = [];

  // const apiData = await axios.get(
  //   `https://fakestoreapi.com/products/${idProduct}`
  // );
  // const condicionArray = ["Nuevo", "Usado", "Reacondicionado"];
  // const indiceAleatorio = Math.floor(Math.random() * 3);

  // ProductInfo = {
  //   id_producto: apiData.data.id,
  //   nombre: apiData.data.title,
  //   descripcion_producto: apiData.data.description,
  //   valor_normal: apiData.data.price,
  //   valor_con_descuento: apiData.data.price,
  //   estado: apiData.data.true,
  //   condicion: condicionArray[indiceAleatorio],
  //   categoria: apiData.data.category,
  //   imagen: apiData.data.image,
  // };
  //buscar por id de la db
  const dbdata = await Producto.findByPk(idProduct, {
    attributes: [
      "id_producto",
      "nombre",
      "fecha_inicial",
      "fecha_final",
      "descripcion_producto",
      "cantidad",
      "existencia",
      "valor_normal",
      "valor_con_descuento",
      "imagen",
      "condicion",
      "estado",
      "id_categoria_producto",
    ],
    include: [
      { model: Comercio, attributes: ["nombre_comercio", "id_comercio"] },
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
