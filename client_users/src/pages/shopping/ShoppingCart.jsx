import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from "react-router-dom";
import CartCard from "../../components/Cart_card/CartCard"
import enviarStock from "./enviarStock"
import { cleanMercadoPago, getUserById, mercadoPago } from "../../redux/actions"
//import Cookies from "js-cookie";
//import jwt_decode from "jwt-decode";
import { clean } from "./clean"
import { date } from "./date"
import { mail } from "./user"
import axios from "axios"
import swal from "sweetalert"

import styles from './shopping.module.css'


export default function ShoppingCart() {
  const dispatch = useDispatch()
  const { carrito, linkMercadoPago, countCarrito, usuario } = useSelector((state) => state);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const email = mail()
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    window.localStorage.setItem("count", JSON.stringify(countCarrito));
    dispatch(getUserById(email))
    return () => {
      dispatch(cleanMercadoPago());
      if(setShouldRedirect){
        window.localStorage.setItem("carrito", JSON.stringify([]));
        window.localStorage.setItem("count", JSON.stringify(0));
      }
      setShouldRedirect(false);
    }
  }, [carrito]);
  //Suma de subtotales
  let total = 0
  carrito.forEach(producto => {
    total = total + producto.discount_price * producto.amount
  });

  //Boton de mercadoPago
  const handlerPago = async () => {
    const response = await fetch('https://ecommercedep.onrender.com/buy-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productos: carrito })
    });
    const data = await response.json();
    dispatch(mercadoPago(data.init_point))

  }
  // console.log(usuario);
  //post a venta
  const handlerDetalleVenta = async () => {

    // const session = Cookies.get("user_session");
    // console.log(session)
    // let values = JSON.parse(session)
    
    // let cookieUsuario = values.dataValues
    // // console.log(cookieUsuario, "USUARIO")
    
    // const fecha = date();
    // const detalle_venta = clean(carrito);
    // const valor_total_venta = detalle_venta.reduce((a, b) => {
    //   return a + b.valor_total_cantidad
    // }, 0)
    // const venta = {
    //   fecha,
    //   valor_total_venta,
    //   id_usuario: cookieUsuario.id_usuario,
    //   detalle_venta,
    //   estado:false
    // }
    // await axios.post("http://localhost:3001/venta", venta)
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     swal({
    //       title: "Ocurrio un error",
    //       text: `${error}`,
    //       icon: "error",
    //       timer: "3000"
    //     })
    //   })
    const stockActualizado = enviarStock(carrito)
    await axios.put("https://ecommercedep.onrender.com//products", stockActualizado)
    .then(response => {
      console.log(response.data);
      setShouldRedirect(true)
      window.location.reload()
    })
    .catch(error => {
      swal({
        title: "Ocurrio un error",
          text: `${error}`,
          icon: "error",
          timer: "3000"
      })
    })  
  }
  return (
    <>
    {shouldRedirect ? (
        <Redirect to="/" />
      ) : (
        <div style={{ marginTop: "100px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.titulo}>
              <h2>Carrito de compras</h2>
            </div>
          </div>
          {carrito.length ? (
            <div style={{ marginBottom: "120px" }}>
              {carrito?.map(producto => (
                <CartCard
                  key={producto.product_id}
                  product_id={producto.product_id}
                  image={producto.image}
                  name={producto.name}
                  discount_price={producto.discount_price}
                  amount={producto.amount}
                  total={total}
                />
              ))}
              <div className={styles.containerTotal}>
                <div className={styles.total}>
                  <div style={{ fontSize: "30px", marginLeft: "15px" }}>
                    <h3>Total</h3>
                  </div>
                  <div style={{ fontSize: "30px", marginRight: "15px" }}>
                    <h3>${total}</h3>
                  </div>
                </div>
              </div>
              {linkMercadoPago ? (
                <div className={styles.mercadoPago}>
                  <a
                    target="_blank"
                    onClick={handlerDetalleVenta}
                    href={linkMercadoPago}>Pagar</a>
                </div>
              ) : (
                <button onClick={handlerPago}>Confirmar compra</button>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={styles.text}>
                <div>
                  <p>No hay productos en el carrito.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        )}
    </>
  );
}
