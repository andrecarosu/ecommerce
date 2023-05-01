const {actualizarOrden, editOrder} = require("../../controllers/order/putOrderController");
const {getDetalle_Venta} = require("../../controllers/order/getOrderController")

// Handler
const actualizarUsuarioHandler = async (req, res, next) => {
    try {
      const { order_id } = req.body; // Obtén el ID del usuario a actualizar
      const updateData = req.body; // Obtén los datos de actualización del cuerpo de la solicitud
  
      // Llama al controlador para actualizar el usuario con los datos proporcionados
      await actualizarOrden(order_id, updateData);
  
      // Retorna una respuesta exitosa
      res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
      // Manejo de errores
      next(error);
    }
  };


  const putUserHandler = async (req, res, next) => {
    const order_id = req.params.order_id;
    const { state } = req.body
    
    try {
      await editOrder(order_id, state)
        const results = await getDetalle_Venta(order_id)
        res.status(200).json(results)

    } catch (error) {
        next(error)
    }
}

  
  module.exports = { actualizarUsuarioHandler, putUserHandler };
  