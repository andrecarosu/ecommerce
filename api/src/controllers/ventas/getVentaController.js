
const { Venta, Detalle_venta, Producto, Usuario, Comercio } = require("../../db");

const getVenta = async () => {
  // buscar en la bbd
  const databaseVenta = await Venta.findAll({
    include: [{ model: Usuario }, { model: Detalle_venta, include: [{ model: Comercio }, { model: Producto }] }]

  });

  return databaseVenta;
};

const getDetalle_Venta = async (id_venta) => {

  const Oneventa = await Venta.findOne({
    where: {
      id_venta
    },
    include: [{ model: Usuario }, { model: Detalle_venta, include: [{ model: Comercio }, { model: Producto }] }]

  })

  return Oneventa
}

const getVentasUsuario = async (id_usuario) => {

  const ventas = await Venta.findAll({
    where: {
      id_usuario
    },
    include: [
      {
        model: Detalle_venta,
        include: [{ model: Producto }]
      }
    ]

  })

  return ventas
}

module.exports = {
  getVenta, getDetalle_Venta, getVentasUsuario
};