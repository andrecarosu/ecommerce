const validacionPostProducto = (data) => {
  const {
    nombre,
    fecha_inicial,
    fecha_final,
    descripcion_producto,
    cantidad,
    existencia,
    valor_normal,
    valor_con_descuento,
    condicion,
    imagen,
    id_categoria_producto,
    id_comercio,
  } = data;

  if (
    !nombre ||
    !fecha_inicial ||
    !fecha_final ||
    !descripcion_producto ||
    !cantidad ||
    !existencia ||
    !valor_normal ||
    !valor_con_descuento ||
    !condicion ||
    !imagen 
  ) {
    throw new Error("Todos los campos son obligatorios");
  }

  //------------nombre-------------

  if (typeof nombre !== "string") {
    throw new Error("Nombre debe ser un string");
  }

  if (nombre.length < 3) {
    throw new Error("Nombre debe contener al menos 3 caracteres");
  }

  if (nombre.length > 51) {
    throw new Error("Nombre puede contener como maximo 50 caracteres");
  }

  if (!/^[a-zA-ZñÑ0-9\s._\-]+$/i.test(nombre)) {
    throw new Error(
      "Nombre puede contener solo letras a-z, numeros y guiones '-', '_'"
    );
  }

  //----------------fecha_inicial-------------------

  if (
    !/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/i.test(
      fecha_inicial
    )
  ) {
    throw new Error("El formato de fecha correcto es aaaa-mm-dd ");
  }

  //----------------fecha_final-------------------

  if (
    !/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/i.test(
      fecha_final
    )
  ) {
    throw new Error("El formato de fecha correcto es aaaa-mm-dd ");
  }

  //--------------descripcion_producto---------------

  if (typeof descripcion_producto !== "string") {
    throw new Error("Descripcion debe ser un string");
  }

  if (descripcion_producto.length < 10) {
    throw new Error("Descripcion debe contener al menos 10 caracteres");
  }

  if (descripcion_producto.length > 501) {
    throw new Error("Descripcion puede contener como maximo 500 caracteres");
  }

  //-----------------cantidad------------------

  if (typeof cantidad !== "number") {
    throw new Error("Cantidad debe ser un numero");
  }

  if (!/^[0-9]+$/i.test(cantidad)) {
    throw new Error("Cantidad debe ser un numero");
  }

  if (cantidad > existencia) {
    throw new Error("Cantidad no puede ser mayor a existencia");
  }

  //---------------------existencia-------------

  if (typeof existencia !== "number") {
    throw new Error("Existencia debe ser un numero");
  }

  if (!/^[0-9]+$/i.test(existencia)) {
    throw new Error("Existencia debe ser un numero");
  }

  //-------------------valor_normal------------

  if (typeof valor_normal !== "number") {
    throw new Error("Valor debe ser un numero");
  }

  if (!/^[0-9.]+$/i.test(valor_normal)) {
    throw new Error("Valor debe ser un numero");
  }

  if (valor_normal < Number.MIN_VALUE || valor_normal > Number.MAX_VALUE) {
    throw new Error("el Valor introducido no es un valor valido");
  }

  //-------------------valor_con_descuento------------

  if (typeof valor_con_descuento !== "number") {
    throw new Error("Valor con descuento debe ser un numero");
  }

  if (!/^[0-9.]+$/i.test(valor_con_descuento)) {
    throw new Error("Valor con descuento debe ser un numero");
  }

  if (
    valor_con_descuento < Number.MIN_VALUE ||
    valor_con_descuento > Number.MAX_VALUE
  ) {
    throw new Error("el Valor introducido no es un valor valido");
  }

  //---------------------condicion-----------------

  if (typeof condicion !== "string") {
    throw new Error("Condicion debe ser un string");
  }

  if (condicion !== "Nuevo") {
    if (condicion !== "Usado") {
      if (condicion !== "Reacondicionado") {
        throw new Error(
          "Condicion debe ser 'Nuevo', 'Usado' o 'Reacondicionado'"
        );
      }
    }
  }

  //-----------------imagen------------

  if (typeof imagen !== "string") {
    throw new Error("Imagen debe ser un string");
  }

  if (imagen.length > 201) {
    throw new Error("Imagen puede contener como maximo 200 caracteres");
  }
};

module.exports = { validacionPostProducto };
