import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CartCard from "../../components/Cart_card/CartCard"
import { cleanMercadoPago, mercadoPago } from "../../redux/actions"
import styles from './shopping.module.css'


export default function ShoppingCart() {
  const dispatch = useDispatch()
  const { carrito, linkMercadoPago, countCarrito } = useSelector((state) => state);

  useEffect(() => {
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    window.localStorage.setItem("count", JSON.stringify(countCarrito));
    return () => {
      dispatch(cleanMercadoPago());
    }
  }, [carrito, countCarrito, dispatch]);
  
  //Boton de mercadoPago
  const handlerPago = async () => {
    const response = await fetch('http://localhost:3001/buy-products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productos: carrito })
    });
    const data = await response.json();
    dispatch(mercadoPago(data.init_point))
  };
  const total = (carrito) => {
    let total = 0
    carrito.forEach(producto => {
    total = total + producto.discount_price * producto.amount
  });
  return total;
}
 
  return (
        <div style={{ marginTop: "100px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.titulo}>
              <h2>Carrito de compras</h2>
            </div>
          </div>
          {carrito.length ? (
            <div style={{ marginBottom: "120px" }}>
              {carrito?.map((producto,index) => (
                <CartCard
                  key={producto.product_id}
                  index={index}
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
                    <h3>${total(carrito)}</h3>
                  </div>
                </div>
              </div>
              {linkMercadoPago ? (
                <div className={styles.mercadoPago}>
                  <a
                    rel="noreferrer"
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
  );
}
