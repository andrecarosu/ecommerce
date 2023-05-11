import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userId, date, detailOrder, total } from "./assistand";
import swal from 'sweetalert';
import axios from "axios"


function PaySuccess () {

  const { carrito, countCarrito } = useSelector((state) => state);

  useEffect(()=>{
    window.localStorage.setItem("count", JSON.stringify(0));
    const postVenta = async () => {
      const venta = {
        date: date(),
        total: total(carrito),
        user_id : userId(),
        detail_order : detailOrder(carrito),
        state: true
      }
      console.log(venta);
      await axios.post("https://deploynodejsecommerce.onrender.com/usuario/venta", venta)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          swal({
            title: "Ocurrio un error",
            text: `${error}`,
            icon: "error",
            timer: "3000"
          })
        })
      };
      postVenta();
      window.localStorage.setItem("carrito", JSON.stringify([]));
      if (carrito.length !== 0) {
        window.location.reload();
      }
  },[])
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh"}}>
      <div style={{border:"solid 1px red"}}>
        <p>Pago Exitoso</p>
      </div>
    </div>
  )
};

export default PaySuccess;
