const { getAllUsers, getUserByName, getUserById} = require("../../controllers/usuarios/getUsuarioController");

const getAllUsersHandler = async (req, res, next) => {
  const { name } = req.query;
  try {
    const results = name ? await getUserByName(name) : await getAllUsers()

    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
};


const getUserByIdHandler = async (req, res, next) => {
  const { idUser } = req.params
  try {
    const UserId = await getUserById(idUser)
    res.status(200).json(UserId)
  } catch (error) {
    next(error)
  }
};



module.exports = {
  getAllUsersHandler,
  getUserByIdHandler
}


