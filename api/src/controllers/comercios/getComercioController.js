const { Comercio, Ciudad, Categoria_comercio } = require("../../db");
const { compareSync } = require("bcrypt");

const getCommerce = async () => {
  // buscar todas en la bd
  const databaseCommerce = await Comercio.findAll({
    attributes: [
      "id_comercio",
      "nombre_comercio",
      "direccion",
      "telefono",
      "estado",
      "nombre_contacto",
      "cargo",
      "password",
      "email",
      "imagen",
      "admin"
    ],
    include: [{
      model: Ciudad,
      attributes: ["nombre_ciudad"]
    },
    {
      model: Categoria_comercio,
      attributes: ["nombre_categoria_comercio"]
    }]
  });

  return databaseCommerce;
};

const getOneCommerce = async (email, password) => {
  // buscar una en la bd
  const databaseCommerce = await Comercio.findOne({
    where: {
      email: email,
    },
  });

  if (databaseCommerce !== null) {
    const validacionPassword = compareSync(password, databaseCommerce.password);
    if (validacionPassword === true) {
      return databaseCommerce;
    } else {
      return null;
    }
  }
};

const getCommerceId = async (id_comercio) => {
  const databaseCommerce = await Comercio.findByPk(id_comercio,{
    attributes:["id_comercio",
    "nombre_comercio",
    "direccion",
    "telefono",
    "estado",
    "nombre_contacto",
    "cargo",
    "password",
    "email",
    "imagen",
    "admin"],
    include: [{
      model: Ciudad,
    },
    {
      model: Categoria_comercio,
    }]
  });

  const results = databaseCommerce;
  return results;
};

const searchEmailCommerce = async (email) => {
  const { Op } = require('sequelize');
  const oneMail = await Comercio.findOne({
    where: {
      email: {[Op.eq]:email} ,
    },
    include: [{
      model: Ciudad,
    },
    {
      model: Categoria_comercio,
    }]
  });
  return oneMail;
};

const searchNameCommerce = async (nombre_comercio) => {
  const oneName = await Comercio.findOne({
    where: {
      nombre_comercio,
    },
    include: [{
      model: Ciudad,
    },
    {
      model: Categoria_comercio,
    }]
  });
  return oneName;
};


const getAndCreateCommerce = async () => {

  var arrayComercio = [
    {
      "id_categoria_comercio": 1,
      "id_ciudad": 3996,
      "nombre_comercio": "comercio1",
      "direccion": "Argenta5",
      "telefono": 26154783774,
      "estado": true,
      "nombre_contacto": "Ramon Ortega",
      "cargo": "Encargado",
      "password": "contraseña",
      "email": "comercio1@gmail.com",
      "imagen": ""
    }
    , {
      "id_categoria_comercio": 2,
      "id_ciudad": 3996,
      "nombre_comercio": "comercio2",
      "direccion": "Colombia1",
      "telefono": 26154783774,
      "estado": true,
      "nombre_contacto": "Ramon Ortega",
      "cargo": "Encargado",
      "password": "contraseña",
      "email": "comercio2@gmail.com",
      "imagen": ""
    }
  ]

  arrayComercio.forEach(async (comercio, i) => {
    console.log(comercio)

    // const encontrado = await Comercio.findOne({ where: { email: comercio.email } });

    // if (encontrado === null) {
    //   const crearCategoria = await Comercio.create({
    //     email: comercio,

    //   })
    // }


  })

  return

};

module.exports = {
  getCommerce,
  getOneCommerce,
  getCommerceId,
  searchNameCommerce,
  searchEmailCommerce,
  getAndCreateCommerce
};
