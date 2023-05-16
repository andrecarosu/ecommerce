const { PerfilGoogle} = require("../../db");
const { Op, Sequelize } = require("sequelize");

const getAllEmailPerfil = async () => {
  try {
    const dataUser = await PerfilGoogle.findAll({
      attributes: [
        "perfil_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "image"
      ]
    });
    const results = [...dataUser];
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getPerfilByEmail = async (email) => {
  try {
    const users = await PerfilGoogle.findAll({
      where: {
        email: { [Op.regexp]: `^${email}$` } // Utiliza una expresión regular para buscar el correo exacto
      },
      attributes: [
        "perfil_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "image"
      ]
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};




  module.exports = { getPerfilByEmail , getAllEmailPerfil };