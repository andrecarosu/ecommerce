const { Order } = require("../../db");
const { Op, Sequelize } = require("sequelize");

const actualizarOrden = async (order_id, updateData) => {
    try {
      // Verifica si hay datos para actualizar
      if (!updateData || Object.keys(updateData).length === 0) {
        throw new Error("No se proporcionaron datos de actualización");
      }
      
      // Actualiza los campos específicos de la orden en la base de datos
      const [filasActualizadas, [ordenActualizada]] = await Order.update(updateData, {
        where: { order_id },
        returning: true // Devuelve el registro actualizado
      });
  
      // Verifica si la orden se actualizó correctamente
      if (filasActualizadas === 0) {
        throw new Error("No se encontró la orden especificada");
      }
      
      // Retorna la orden actualizada
      return ordenActualizada;
    } catch (error) {
      // Manejo de errores
      throw new Error("Ocurrió un error al actualizar la orden: " + error.message);
    }
  };

  const editOrder = async (order_id, state) => {
    
    const editOneOrder = await Order.update(
        {
          state,
        },
        {
            where: { order_id },
        }
        );
        
        return editOneOrder;
    };
  
  module.exports = { actualizarOrden, editOrder };
  
  
  