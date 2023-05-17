import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CartCard from "../../components/Cart_card/CartCard"
import { cleanMercadoPago, mercadoPago } from "../../redux/actions"
import styles from './shopping.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom"

export default function ShoppingCart() {
  const dispatch = useDispatch()
  const { carrito, linkMercadoPago, countCarrito } = useSelector((state) => state);
  const url = process.env.REACT_APP_DEPLOYBACK_URL

  useEffect(() => {
    window.localStorage.setItem("carrito", JSON.stringify(carrito));
    window.localStorage.setItem("count", JSON.stringify(countCarrito));
    return () => {
      dispatch(cleanMercadoPago());
    }
  }, [carrito, countCarrito, dispatch]);
  
  //Boton de mercadoPago
  const handlerPago = async () => {
    const response = await fetch(`${url}/buy-products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productos: carrito })
    });
    const data = await response.json();
    dispatch(mercadoPago(data.init_point))
  };

  const handlerPermission = () => {
    localStorage.setItem("permission", true)
  }

  const total = (carrito) => {
    let total = 0
    carrito.forEach(producto => {
    total = total + producto.discount_price * producto.amount
  });
  return total;
  };

  //Boton atrás
  const history = useHistory();
  const handlerBack = () =>{
    history.goBack();
  };
 
  return (
        <div style={{ margin: "100px 0 30px 0", display:"flex", justifyContent:"center"}}>
          <div className={styles.back} onClick={handlerBack}>
              <FontAwesomeIcon icon={faArrowLeft}  style={{color:"grey"}}/>
          </div>
          <div style={{ border: "solid 1px rgb(200, 197, 197)", width:"90%", borderRadius:"3px", backgroundColor:"white" ,boxShadow: "0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={styles.titulo}>
                <h1>Mi carrito</h1>
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
                      href={linkMercadoPago}
                      onClick = {handlerPermission}
                      >
                        Pagar
                      </a>
                  </div>
                ) : (
                  <div style={{marginTop: "50px"}}>
                    <button onClick={handlerPago}>Confirmar compra</button>
                  </div>
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
        </div>
  );
}
