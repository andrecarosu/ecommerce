const { getAllUsers, getUserByName, getUserById, } = require("../../controllers/usuarios/getUsuarioController");
const { verifyPassword } = require("../../controllers/usuarios/verifyPassword")

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
  const { user_id } = req.params
  try {
    const UserId = await getUserById(user_id)
    res.status(200).json(UserId)
  } catch (error) {
    next(error)
  }
};

const validatePasswordUserHandler = async (req, res, next) => {

  const { user_id, matchPassword } = req.body
  try {
    const response = await verifyPassword(user_id, matchPassword)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}



module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  validatePasswordUserHandler
}


