const { Order, Detail_order, Product} = require("../../db");

const createVenta = async (date, total, state, user_id, detail_order) => {
    try {
        const venta = await Order.create({
            date: new Date(),
            total,
            state,
            user_id,
        });
        const newVenta = await venta.save();
        return newVenta;
    } catch (error) {
        console.log(error);
        throw new Error("Hubo un error creando la venta");
    }
};

// const createDetalleVenta = async (detalle_order, venta_id) => {
//   try {
//     const newDetalleVenta = await Promise.all(
//       detalle_order.map(async (detalle) => {
//         const { product_id, amount, unit_value, value, name } = detalle;
//         const detalle_venta = await Detail_order.create({
//           amount: amount,
//           unit_value: unit_value,
//           value: value,
//           ProductProductId: product_id,
//           OrderOrderId: venta_id,
//           name: name,
//         });
//         return detalle_venta;
//       })
//     );
//     return newDetalleVenta;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Hubo un error creando el detalle de venta");
//   }
// };

const createDetalleVenta = async (detalle_order, venta_id) => {
  try {
    const newDetalleVenta = await Promise.all(
      detalle_order.map(async (detalle) => {
        const { product_id, amount, unit_value, value } = detalle;
        const product = await Product.findByPk(product_id); // Buscar el producto por su ID
        console.log(30,product);
        const detalle_venta = await Detail_order.create({
          amount: amount,
          unit_value: unit_value,
          value: value,
          ProductProductId: product_id,
          OrderOrderId: venta_id,
          name: product.name,
          image: product.image, // Incluir el nombre del producto en el campo name
        });
        return detalle_venta;
      })
    );
    return newDetalleVenta;
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un error creando el detalle de venta");
  }
};




module.exports = { createVenta, createDetalleVenta };
