const validacionPostComercio = (data) => {
  const {
    id_categoria_comercio,
    id_ciudad,
    nombre_comercio,
    direccion,
    telefono,
    nombre_contacto,
    cargo,
    password,
    email,
    imagen,
  } = data;

  if (
    !nombre_comercio ||
    !direccion ||
    !telefono ||
    !nombre_contacto ||
    !cargo ||
    !password ||
    !email 
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  //------------------nombre_comercio------------

  if (typeof nombre_comercio !== "string") {
    throw new Error("Nombre debe ser un string");
  }

  if (nombre_comercio.length < 3) {
    throw new Error("Nombre debe contener al menos 3 caracteres");
  }

  if (nombre_comercio.length > 51) {
    throw new Error("Nombre puede contener como maximo 50 caracteres");
  }

  if (!/^[a-zA-ZñÑ0-9\s._\-]+$/i.test(nombre_comercio)) {
    throw new Error(
      "Nombre puede contener solo letras a-z, numeros y guiones '-', '_'"
    );
  }

  //------------------direccion------------

  if (typeof direccion !== "string") {
    throw new Error("Direccion debe ser un string");
  }

  if (direccion.length < 3) {
    throw new Error("Direccion debe contener al menos 3 caracteres");
  }

  if (direccion.length > 101) {
    throw new Error("Direccion puede contener como maximo 100 caracteres");
  }

  if (!/^[a-zA-ZñÑ0-9\s.\-]+$/i.test(direccion)) {
    throw new Error(
      "Direccion puede contener solo letras a-z, numeros y guiones '-'"
    );
  }

  //------------------telefono------------

  if (typeof telefono !== "number") {
    throw new Error("Telefono debe ser un numero");
  }

  if (telefono.toString().length < 10) {
    throw new Error("Telefono debe contener al menos 10 caracteres");
  }

  if (telefono.toString().length > 25) {
    throw new Error("Telefono no puede ser mayor a 25 caracteres");
  }

  if (!/^[0-9]+$/i.test(telefono)) {
    throw new Error("Telefono debe ser un numero");
  }

  //------------------nombre_contacto------------

  if (typeof nombre_contacto !== "string") {
    throw new Error("Nombre de contacto debe ser un string");
  }

  if (nombre_contacto.length < 3) {
    throw new Error("Nombre de contacto debe contener al menos 3 caracteres");
  }

  if (nombre_contacto.length > 51) {
    throw new Error(
      "Nombre de contacto puede contener como maximo 50 caracteres"
    );
  }

  if (
    !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(
      nombre_contacto
    )
  ) {
    throw new Error("Nombre de contacto puede contener solo letras");
  }

  //------------------cargo------------

  if (typeof cargo !== "string") {
    throw new Error("Cargo debe ser un string");
  }

  if (cargo.length < 3) {
    throw new Error("Cargo debe contener al menos 3 caracteres");
  }

  if (cargo.length > 31) {
    throw new Error("Cargo puede contener como maximo 30 caracteres");
  }

  if (!/^[a-zA-ZñÑ0-9\s._\-]+$/i.test(cargo)) {
    throw new Error(
      "Cargo puede contener solo letras a-z, numeros y guiones '-', '_'"
    );
  }

  //------------------password------------

  if (typeof password !== "string") {
    throw new Error("Contraseña debe ser un string");
  }

  if (password.length > 101) {
    throw new Error("Contraseña puede contener como maximo 100 caracteres");
  }

  //------------------email------------

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

  //------------------imagen------------

  if (typeof imagen !== "string") {
    throw new Error("Imagen debe ser un string");
  }

  if (imagen.length > 201) {
    throw new Error("Imagen puede contener como maximo 200 caracteres");
  }
};

module.exports = { validacionPostComercio };
