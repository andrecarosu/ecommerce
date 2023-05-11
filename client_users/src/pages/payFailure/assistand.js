import Cookies from "js-cookie";

    
    /*ID DE USUARIO*/
export const userId = () => {
    const session = Cookies.get("user_session");
    console.log(session)
    let values = JSON.parse(session)
    let userCookie = values.dataValues
    let  userId = userCookie.user_id 
    return userId;
};

    /*FECHA DE LA VENTA*/
    export const date = () => {
        let fecha = new Date();
        let dia = fecha.getUTCDate() + 1;
        let mes = fecha.getUTCMonth() + 1 ;
        let anio = fecha.getUTCFullYear();
        let horas = fecha.getUTCHours() - 3; 
        let minutos = fecha.getUTCMinutes();
        let segundos = fecha.getUTCSeconds();
        return `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}T${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}.000-03:00`;
    };

    /*DETALLE DE LA VENTA*/
export const detailOrder = (carrito) => {
    const detail = carrito.map(product => {
        return {
            amount: product.amount,
            value: product.amount*product.discount_price,
            product_id: product.product_id,
            unit_value: product.discount_price,
        }
    }) 
    return detail;
};

export const total = (carrito) => {
    let total = 0
    carrito.forEach(producto => {
    total = total + producto.discount_price * producto.amount
  });
  return total;
}