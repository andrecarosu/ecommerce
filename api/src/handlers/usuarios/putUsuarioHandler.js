const { actualizarUsuario, editUser, resetPassword } = require("../../controllers/usuarios/putUsuarioController")
const { getUserById } = require("../../controllers/usuarios/getUsuarioController")

// Handler
const actualizarUsuarioHandler = async (req, res, next) => {
  try {
    const { user_id } = req.body; // Obtén el ID del usuario a actualizar
    const updateData = req.body; // Obtén los datos de actualización del cuerpo de la solicitud

    // Llama al controlador para actualizar el usuario con los datos proporcionados
    await actualizarUsuario(user_id, updateData);

    // Retorna una respuesta exitosa
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    // Manejo de errores
    next(error);
  }
};


const putUserHandler = async (req, res, next) => {
  const { user_id, estado } = req.body

  try {
    await editUser(user_id, estado)
    const results = await getUserById(user_id)

    res.status(200).json(results)

  } catch (error) {
    next(error)
  }
}


const resetPasswordHandler = async (req, res, next) => {
  const { email } = req.body
  try {
    const result = await resetPassword(email)

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}


module.exports = { actualizarUsuarioHandler, putUserHandler, resetPasswordHandler };
