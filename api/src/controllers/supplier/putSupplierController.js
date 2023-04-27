const { User, Tipo_usuario, Ciudad } = require("../../db");
const { Op, Sequelize } = require("sequelize");

const actualizarUsuario = async (user_id, updateData) => {
    try {
      // Verifica si hay datos para actualizar
      if (!updateData || Object.keys(updateData).length === 0) {
        throw new Error("No se proporcionaron datos de actualización");
      }
      
      // Actualiza los campos específicos del usuario en la base de datos
      const [filasActualizadas, [usuarioActualizado]] = await User.update(updateData, {
        where: { user_id },
        returning: true // Devuelve el registro actualizado
      });
  
      // Verifica si el usuario se actualizó correctamente
      if (filasActualizadas === 0) {
        throw new Error("No se encontró el usuario especificado");
      }
      
      // Retorna el usuario actualizado
      return usuarioActualizado;
    } catch (error) {
      // Manejo de errores
      throw new Error("Ocurrió un error al actualizar el usuario: " + error.message);
    }
  };

  const editUser = async (user_id, estado) => {
    
    const editOneUser = await User.update(
        {
          estado,
        },
        {
            where: { user_id },
        }
        );
        
        return editOneUser;
    };
  
  module.exports = { actualizarUsuario, editUser };
  
  
  