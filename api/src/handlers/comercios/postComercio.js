const {
  createCommerce,
} = require("../../controllers/comercios/postComercioController");
const {
  searchNameCommerce,
  searchEmailCommerce,
} = require("../../controllers/comercios/getComercioController");
const {
  validacionPostComercio,
} = require("../validaciones/validacionComercio");

const postCommerceHandler = async (req, res) => {
  const {
    id_ciudad,
    id_categoria_comercio,
    nombre_comercio,
    direccion,
    telefono,
    estado,
    nombre_contacto,
    cargo,
    password,
    email,
    imagen,
    admin
  } = req.body;

  try {
    if (
      (nombre_comercio,
      direccion,
      telefono,
      estado,
      nombre_contacto,
      cargo,
      password,
      email,
      imagen
      )
    ) {
      const [resultSearchName, resultSearchEmail] = await Promise.all([
        searchNameCommerce(nombre_comercio),
        searchEmailCommerce(email),
      ]);
      if (resultSearchEmail === null && resultSearchName === null) {
        const newCommerce = await createCommerce(
          id_ciudad,
          id_categoria_comercio,
          nombre_comercio,
          direccion,
          telefono,
          estado,
          nombre_contacto,
          cargo,
          password,
          email,
          imagen,
          admin
        );
        res.status(200).json(newCommerce);
      } else if (resultSearchEmail !== null) {
        res.status(300).send({ data: "ya existe un camercio con ese email" });
      } else {
        res.status(300).send({ data: "ya existe un camercio con ese nambre" });
      }
    } else {
      res.status(300).send({ data: "faltan llenar campos" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });

  }
};
module.exports = {
  postCommerceHandler,
};