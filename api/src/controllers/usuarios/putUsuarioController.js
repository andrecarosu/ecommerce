const { Usuario, Tipo_usuario, Ciudad } = require("../../db");
const { Op, Sequelize } = require("sequelize");

const actualizarUsuario = async (id_usuario, updateData) => {
    try {
      // Verifica si hay datos para actualizar
      if (!updateData || Object.keys(updateData).length === 0) {
        throw new Error("No se proporcionaron datos de actualización");
      }
      
      // Actualiza los campos específicos del usuario en la base de datos
      const [filasActualizadas, [usuarioActualizado]] = await Usuario.update(updateData, {
        where: { id_usuario },
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

  const editUser = async (id_usuario, estado) => {
    
    const editOneUser = await Usuario.update(
        {
          estado,
        },
        {
            where: { id_usuario },
        }
        );
        
        return editOneUser;
    };
  
  module.exports = { actualizarUsuario, editUser };
  
  
  