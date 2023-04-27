const { createSupplier } = require("../../controllers/supplier/postSupplierController")
const { validacionPostProveedor } = require("../validaciones/validationsSupplier")


const postSupplierHandler = async (req, res) => {
  let { name, address, phone, state, contact_name, post, email, city} = req.body
 
  try {

    validacionPostProveedor(req.body)
    
    const newSupplier = await createSupplier(name, address, phone, state, contact_name, post, email, city)
    res.status(200).send('Registro exitoso')

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}
module.exports = {
  postSupplierHandler
}