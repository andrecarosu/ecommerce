const validacionPostUsuario = (data) => {
  const {
    name,
    address,
    phone,
    email,
    password,
    image,
    city,
  } = data;

  if (
    !name ||
    !address ||
    !phone||
    !email 
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  //--------------primer_nombre----------------

  if (typeof name !== 'string') {
    throw new Error("Nombre debe ser un string");
  }

  if (name.length < 3) {
    throw new Error("Nombre debe contener al menos 3 caracteres");
  }

  if (name.length > 51) {
    throw new Error("Nombre puede contener como maximo 50 caracteres");
  }

  if (
    !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(
      name
    )
  ) {
    throw new Error("Nombre puede contener solo letras");
  }  

  //-------------------direccion------------------

  if (typeof address !== "string") {
    throw new Error("Direccion debe ser un string");
  }

  if (address.length < 3) {
    throw new Error("Direccion debe contener al menos 3 caracteres");
  }

  if (address.length > 101) {
    throw new Error("Direccion puede contener como maximo 100 caracteres");
  }

  if (!/^[a-zA-ZñÑ0-9\s.\-]+$/i.test(address)) {
    throw new Error(
      "Direccion puede contener solo letras a-z, numeros y guiones '-'"
    );
  }

  //-------------------telefono------------------

  // if (typeof telefono !== "number") {
  //   throw new Error("Telefono debe ser un numero");
  // }

  // if (telefono.toString().length < 10) {
  //   throw new Error("Telefono debe contener al menos 10 caracteres");
  // }

  // if (telefono.toString().length > 25) {
  //   throw new Error("Telefono no puede ser mayor a 25 caracteres");
  // }

  // if (!/^[0-9]+$/i.test(telefono)) {
  //   throw new Error("Telefono debe ser un numero");
  // }

  //-------------------email------------------

  if (typeof email !== "string") {
    throw new Error("Email debe ser un string");
  }

  if (email.length > 101) {
    throw new Error("Email puede contener como maximo 100 caracteres");
  }

  if (!/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/i.test(email)) {
    throw new Error(
      "el Email ingresado no es valido, debe tener el siguiente formato: 'usuario@dominio.com"
    );
  }

  //-------------------contraseña------------------

 // if (typeof contraseña !== "string") {
 //   throw new Error("Contraseña debe ser un string");
 // }
//
 // if (contraseña.length > 101) {
 //   throw new Error("Contraseña puede contener como maximo 100 caracteres");
 // }

  //-------------------imagen------------------

  if (image && typeof image !== "string") {
    throw new Error("Imagen debe ser un string");
  }

  if (image && image.length > 201) {
    throw new Error("Imagen puede contener como maximo 200 caracteres");
  }
};

module.exports = { validacionPostUsuario };
