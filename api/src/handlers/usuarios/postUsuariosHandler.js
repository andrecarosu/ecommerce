const { createUsuario } = require("../../controllers/usuarios/postUsuarioController")
const { validacionPostUsuario } = require("../validaciones/validacionUsuario")


const postUserHandler = async (req, res) => {
  let { id_tipo_usuario, id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, id_ciudad, estado, email, password, imagen } = req.body
 
  try {

    validacionPostUsuario(req.body)
    
    const newUser = await createUsuario(id_tipo_usuario, id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, id_ciudad, estado, email, password, imagen)
    res.status(200).send('Registro exitoso')

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}
module.exports = {
  postUserHandler
}