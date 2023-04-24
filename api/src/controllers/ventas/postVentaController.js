const { Venta, Detalle_venta, Producto, } = require("../../db");


const createVenta = async (fecha, valor_total_venta, id_usuario) => {

  const newVenta = await Venta.create({
    fecha,
    valor_total_venta,
    id_usuario
  });

  return newVenta;
};

const createDetalleVenta = async (arrayDetalleventa, newVenta) => {

  const resultMap = await Promise.all(arrayDetalleventa.map(async (i) => {
    const findProducto = await Producto.findOne({
      where: {
        id_producto: i.id_producto
      }
    })

    const newPago = await Detalle_venta.create({
      id_comercio: i.id_comercio,
      cantidad: i.cantidad,
      valor_total_cantidad: i.valor_total_cantidad,
      valor_unitario: i.valor_unitario,
      id_pago: i.id_pago,
      id_venta: newVenta.id_venta,
      id_producto: i.id_producto

    })
  })
  )
  return newVenta.id_venta
};


module.exports = { createVenta, createDetalleVenta };

