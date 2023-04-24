const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { Comercio } = require("../../db")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user:`${process.env.EMAIL_EMAIL}`, 
    pass:`${process.env.EMAIL_PASSWORD}`, 
  },
  tls: {
    rejectUnauthorized: false
  }
});

const createCommerce = async (id_ciudad, id_categoria_comercio,nombre_comercio, direccion, telefono, estado, nombre_contacto, cargo, password, email, imagen, admin) => {

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword
  }

  const newCommerce = await Comercio.create({
    nombre_comercio,
    direccion,
    telefono,
    estado,
    nombre_contacto,
    cargo,
    password,
    email,
    imagen,
    id_ciudad,
    id_categoria_comercio,
    admin
  });

  // Enviar correo electrónico al usuario con sus credenciales
  const mailOptions = {
    from: "justoffers12@gmail.com",
    to: email,
    subject: "Registro exitoso",
    text: `¡Bienvenido a nuestra aplicación! Tu registro fue exitoso. Tus credenciales son:
           Correo electrónico: ${email}
           Contraseña: ${password}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado correctamente:", info.response);
    }
  });

  return newCommerce;
};
 //const adCiudad = await Ciudad.findAll({where: {id_ciudad}});
  //const addCategoriaComercio = await Categoria_comercio.findAll({where: {id_categoria_comercio}});
//
  //await newCommerce.addCiudad(adCiudad);
  //await newCommerce.addCategoria_comercio(addCategoriaComercio)
module.exports = { createCommerce };
