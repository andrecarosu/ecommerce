
const { Order, Detail_order, Product, User } = require("../../db");

const getDetalle_Venta = async (order_id) => {
  try {
   //consulta la Orden

   const detalleOrden = await Order.findAll({
    where: { order_id: order_id },
    raw: true,
  });

     // Consulta los detalles de la venta
    const detallesVenta = await Detail_order.findAll({
      where: { OrderOrderId: order_id },
      raw: true,
    });
    
    // Consulta la información de los productos en los detalles de la venta
    const productos = await Product.findAll({
      where: { product_id: detallesVenta.map((d) => d.ProductProductId) },
      raw: true,
    });

    // Crea un objeto de venta que incluye la información de cada producto
    const venta = {
      id_orden: order_id,

      detalle_orden: detalleOrden.map((order) => ({
        fecha: order.date,
        total: order.total,
        estado: order.state,
        id_usuario: order.user_id
      })),
      
      productos: detallesVenta.map((d) => {
        const producto = productos.find((p) => p.product_id === d.ProductProductId);
        return {
          id_producto: d.ProductProductId,
          nombre_producto: producto ? producto.name : null,
          valor_unitario: d.unit_value,
          valor_total: d.value,
          cantidad: d.amount,
        };
      }),
    };

    return venta;
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un error obteniendo la venta");
  }
};


  const getVenta = async () => {
    try {
       
      // Consulta todas las órdenes
      const orders = await Order.findAll({
        raw: true,
      });
      
      // Consulta todos los detalles de orden
      const details = await Detail_order.findAll({
        raw: true,
      });
  
      // Crea un objeto de venta vacío para cada orden y almacénalo en un nuevo array llamado `ventas`
      const ventas = orders.map((order) => ({
        id: order.order_id,
        id_orden: order.order_id,
        fecha: order.date,
        total: order.total,
        estado: order.state,
        productos: [],
      }));
  
      // Agrega los productos a cada objeto de venta en el array `ventas`
      details.forEach((detail) => {
        const venta = ventas.find((venta) => venta.id === detail.OrderOrderId);
        if (venta) {
          venta.productos.push({
            id: detail.ProductProductId,
            id_producto: detail.ProductProductId,
            valor_unitario: detail.unit_value,
            valor_total: detail.value,
            cantidad: detail.amount,
            name: detail.name
          });
        }
      });
  
      return ventas;
    } catch (error) {
      throw error;
    }
  };
  
  
  

  const getVentasUsuario = async (user_id) => {
    console.log(user_id);
    try {
      // Consulta las órdenes del usuario
      const orders = await Order.findAll({
        where: {
          user_id,
        },
        raw: true,
      });
  
      // Consulta los detalles de orden para las órdenes del usuario
      const orderIds = orders.map((order) => order.order_id);
      const details = await Detail_order.findAll({
        where: {
          OrderOrderId: orderIds,
        },
        raw: true,
      });
  
      // Crea un objeto de venta vacío para cada orden y almacénalo en un nuevo array llamado `ventas`
      const ventas = orders.map((order) => ({
        id: order.order_id,
        id_orden: order.order_id,
        fecha: order.date,
        total: order.total,
        estado: order.state,
        productos: [],
      }));
  
      // Agrega los productos a cada objeto de venta en el array `ventas`
      details.forEach((detail) => {
        const venta = ventas.find((venta) => venta.id === detail.OrderOrderId);
        if (venta) {
          venta.productos.push({
            id: detail.ProductProductId,
            id_producto: detail.ProductProductId,
            valor_unitario: detail.unit_value,
            cantidad: detail.amount,
            valor_total: detail.value,
            name:detail.name
          });
        }
      });
  
      return ventas;
    } catch (error) {
      throw error;
    }
  };
  
  
  

module.exports = {
  getVenta,
  getDetalle_Venta,
  getVentasUsuario
};
