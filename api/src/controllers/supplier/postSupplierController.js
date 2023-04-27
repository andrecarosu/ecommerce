const { Supplier } = require('../../db');

const createSupplier = async (
  name,
  address,
  phone,
  state,
  contact_name,
  post,
  email,
  city,
) => {
   // Crear el usuario en la base de datos con la contraseña encriptada
  const newUser = await Supplier.create({
     name,
     address,
     phone,
     state,
     contact_name,
     post,
     email,
     city,
  });


  return newUser;
};

module.exports = { createSupplier }; 