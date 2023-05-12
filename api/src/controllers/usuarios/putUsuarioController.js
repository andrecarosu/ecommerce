const { User, Tipo_usuario, Ciudad } = require("../../db");
const { Op, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.EMAIL_EMAIL}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false
  }
});

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


const resetPassword = async (email) => {

  try {
    const randomPassword = Math.random().toString(36).slice(-10);
    // Generar un salt para el hash
    const salt = await bcrypt.genSalt(10);
    // Encriptar la contraseña con el salt generado
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    const [filasActualizadas, [usuarioActualizado]] = await User.update({ password: hashedPassword }, {
      where: { email },
      returning: true, // Devuelve el registro actualizado
    });

    if (filasActualizadas == 0) {
      throw new Error("El email registrado no existe")
    }


    console.log('----->', randomPassword)
    return usuarioActualizado

  } catch (error) {
    throw new Error(`Ocurrio un error al reestablecer la contraseña: ${error.message}`)
  }
}

module.exports = { actualizarUsuario, editUser, resetPassword };


