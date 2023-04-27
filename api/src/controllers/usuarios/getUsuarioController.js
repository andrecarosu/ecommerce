const { Usuario, Tipo_usuario, Ciudad } = require("../../db");
const { Op, Sequelize } = require("sequelize");

const getAllUsers = async () => {
  try {
    const dataUser = await Usuario.findAll({
      attributes: [
        "id_tipo_usuario",
        "id_usuario",
        "primer_nombre",
        "segundo_nombre",
        "primer_apellido",
        "segundo_apellido",
        "direccion",
        "telefono",
        "id_ciudad",
        "estado",
        "email",
        "password",
        "imagen"
      ],
      include: [
        {
          model: Tipo_usuario,
          attributes: ["nombre_tipo_usuario"]
        },
        {
          model: Ciudad,
          attributes: ["nombre_ciudad"]
        },
      ]
    });
    const results = [...dataUser];
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async idUser => {
  try {
    const user = await Usuario.findByPk(idUser, {
      attributes: [
        "id_tipo_usuario",
        "id_usuario",
        "primer_nombre",
        "segundo_nombre",
        "primer_apellido",
        "segundo_apellido",
        "direccion",
        "telefono",
        "id_ciudad",
        "estado",
        "email",
        "password",
        "imagen"
      ],
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByName = async name => {
  try {
    const users = await Usuario.findAll({
      attributes: [
        "id_tipo_usuario",
        "id_usuario",
        "primer_nombre",
        "segundo_nombre",
        "primer_apellido",
        "segundo_apellido",
        "direccion",
        "telefono",
        "id_ciudad",
        "estado",
        "email",
        "password",
        "imagen"
      ],
      where: {
        [Op.or]: [
          { primer_nombre: name },
          { segundo_nombre: name },
          { primer_apellido: name },
          { segundo_apellido: name },
        ],
      },
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};



module.exports = { getAllUsers, getUserById, getUserByName};
