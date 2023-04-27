const {actualizarUsuario, editUser} = require("../../controllers/usuarios/putUsuarioController")
const {getUserById} = require("../../controllers/usuarios/getUsuarioController")

// Handler
const actualizarUsuarioHandler = async (req, res, next) => {
    try {
      const { id_usuario } = req.body; // Obtén el ID del usuario a actualizar
      const updateData = req.body; // Obtén los datos de actualización del cuerpo de la solicitud
  
      // Llama al controlador para actualizar el usuario con los datos proporcionados
      await actualizarUsuario(id_usuario, updateData);
  
      // Retorna una respuesta exitosa
      res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      // Manejo de errores
      next(error);
    }
  };


  const putUserHandler = async (req, res, next) => {
    const { id_usuario, estado } = req.body

    try {
        await editUser(id_usuario, estado)
        const results = await getUserById(id_usuario)

        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

  
  module.exports = { actualizarUsuarioHandler, putUserHandler };
  