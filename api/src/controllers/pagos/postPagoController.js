const { Pagos } = require("../../db");


const createPago = async (arrayDetalleventa) => {

  const resultMap = await Promise.all(arrayDetalleventa.map(async (i) => {

    var porsentajeComision = 10 // para el 10%

    var comision = i.valor_total_cantidad * porsentajeComision / 100

    var aPagar = i.valor_total_cantidad - comision

    const newPago = await Pagos.create({
      id_comercio: i.id_comercio,
      fecha: new Date(),
      valor_comision: comision,
      valor_a_pagar: aPagar,
      estado_del_pago: false

    })

    i.id_pago = newPago.id_pago
    return i
  }));

  return resultMap
};

module.exports = { createPago };

