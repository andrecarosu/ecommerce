const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { User, Type_user } = require('../../db');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: `${process.env.EMAIL_EMAIL}`, 
    pass:`${process.env.EMAIL_PASSWORD}`, 
  },
  tls: {
    rejectUnauthorized: false
  }
});

const guardarTipoUsuario = async () => {
  try {
    let tipoUsuario = [
      { name: 'Cliente' },
      { name: 'Administrador' },
    ];
    let mapTipoUsuario = tipoUsuario.map((prop) => ({
      name: prop.name,
    }));
    await Type_user.bulkCreate(mapTipoUsuario);
    console.log('Se guardaron los tipos de usuarios correctamente');
  } catch (error) {
    console.error('Error al cargar los tipos de Usuarios', error);
  }
};

const verifyDb = async () => {
  const aux = await Type_user.count();
  if (aux < 1) await guardarTipoUsuario();
};

const createUsuario = async (
  type_id,
   name,
  address,
  phone,
  city,
  email,
  password,
  image
) => {
  verifyDb();

  // Generar un salt para el hash
  const salt = await bcrypt.genSalt(10);

  // Encriptar la contraseña con el salt generado
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear el usuario en la base de datos con la contraseña encriptada
  const newUser = await User.create({
    type_id,
    name,
     address,
     phone,
     city,
     email,
    password: hashedPassword, // guardar la contraseña encriptada
    image
  });
//asd
  
  const mailOptions = {
    from: "thewinecellar.com@gmail.com",
    to: email,
    subject: "Registro exitoso",
    text: `¡Bienvenido a nuestra aplicación! Tu registro fue exitoso. Tu correo es:
           Correo electrónico: ${email} `,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado correctamente:", info.response);
    }
  });

  return newUser;
};

module.exports = { createUsuario }; 