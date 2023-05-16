import Cookies from "js-cookie";

    
    /*ID DE USUARIO*/
export const userEmail = () => {
    const estaLogueado = localStorage.getItem("estaLogueado")
    let email;
    if(estaLogueado === "database"){
       const session = Cookies.get("user_session");
        let values = JSON.parse(session)
        let userCookie = values.dataValues
        email = userCookie.email 
    } else if(estaLogueado === "google"){
       email = Cookies.get("user_session"); 
    };
    return email;
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
            email: userEmail(),
            state: false
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