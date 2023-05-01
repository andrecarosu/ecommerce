const axios = require("axios"); 
const { Producto} = require("../db");

/*class paymentService{
    async createPayment(idProducto){
        const url = "https://api.mercadopago.com/checkout/preferences"
      
        const producto = await Producto.findOne({ where: { id_producto: idProducto } });
        if (!producto) {
          throw new Error("Producto no encontrado");
        }
      
        const body = {
          payer_email:"test_user_1879813968@testuser.com",
          items:[
            {
              title: producto.nombre,
              description: producto.descripcion_producto,
              picture_url: producto.imagen,
              category_id: producto.id_categoria_producto,
              quantity: 1,
              unit_price: producto.valor_normal
            }
          ],
          back_urls:{
            failure: "/failure",
            pending: "/pending",
            success: "/success"
          }
        };
        
        const payment = await axios.post(url,body, {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCES_TOKEN}`
          }
        });
        return payment.data;
      }
      
  }

module.exports = paymentService*/

class paymentService{
  async createPayment(productos){
    console.log(productos)
    const url = "https://api.mercadopago.com/checkout/preferences"
    let items = [];
    for(let i = 0; i < productos.length; i++) {
      const producto = await Producto.findOne({ where: { id_producto: productos[i].id_producto } });
      if (!producto) {
        throw new Error(`Producto con id ${productos[i].id} no encontrado`);
      }
      items.push({
        title: producto.nombre,
        description: producto.descripcion_producto,
        picture_url: producto.imagen,
        category_id: producto.id_categoria_producto,
        quantity: productos[i].cantidad,
        unit_price: producto.valor_con_descuento
      });
    }
  
    const body = {
      payer_email:"test_user_1879813968@testuser.com",
      items,
      back_urls:{
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };
          
    const payment = await axios.post(url,body, {
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCES_TOKEN}`
      }
    });
    return payment.data;
  }
  
    
}

module.exports = paymentService