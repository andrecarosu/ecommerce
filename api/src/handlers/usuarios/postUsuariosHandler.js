const { createUsuario } = require("../../controllers/usuarios/postUsuarioController")
const { validacionPostUsuario } = require("../validaciones/validacionUsuario")


const postUserHandler = async (req, res) => {
  let { type_id, name, address, phone, city, email, password, image} = req.body
 
  try {

    validacionPostUsuario(req.body)
    
    const newUser = await createUsuario(type_id, name, address, phone, city, email, password, image)
    res.status(200).send('Registro exitoso')

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}
module.exports = {
  postUserHandler
}