const { User, Type_user} = require("../../db");
const { Op, Sequelize } = require("sequelize");

const getAllUsers = async () => {
  try {
    const dataUser = await User.findAll({
      attributes: [
        "type_id",
        "user_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "password",
        "image",
        "estado"
      ],
      include: [
        {
          model: Type_user,
          attributes: ["name"]
        }       
      ]
    });
    const results = [...dataUser];
    return results;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (user_id) => {
  try {
    const user = await User.findByPk(user_id, {
      attributes: [
        "type_id",
        "user_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "password",
        "image",
        "estado"
      ],
    });
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getUserByName = async name => {
  try {
    const users = await User.findAll({
      attributes: [
        "type_id",
        "user_id",
        "name",
        "address",
        "phone",
        "city",
        "estado",
        "email",
        "password",
        "image",
        "estado"
      ],
      where: {
        [Op.or]: [
          { name: name }
        ],
      },
    });
    return users;
  } catch (error) {
    console.error(error);
  }
};



module.exports = { getAllUsers, getUserById, getUserByName};
