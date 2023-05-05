const { User, Type_user} = require("../../db");
const { Op, Sequelize } = require("sequelize");

const getAllUsersEmail = async () => {
  try {
    const dataUser = await User.findAll({
      attributes: [
        "user_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "password",
        "image"
      ],
      include: [
        {
          model: Type_user,
          attributes: ["name"]
        },
      ]
    });
    const results = [...dataUser];
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const users = await User.findAll({
      where: {
        email: { [Op.regexp]: `^${email}$` } // Utiliza una expresión regular para buscar el correo exacto
      },
      attributes: [
        "user_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "password",
        "image"
      ],
      include: [
        {
          model: Type_user,
          attributes: ["name"]
        },
      ],
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};




  module.exports = { getUserByEmail , getAllUsersEmail };