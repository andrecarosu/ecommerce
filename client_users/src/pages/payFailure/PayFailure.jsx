import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { userId, date, detailOrder, total } from "./assistand";
import swal from 'sweetalert';
import axios from "axios"

function PayFailure() {
  const { carrito } = useSelector((state) => state);

  useEffect(()=>{
    const postVenta = async () => {
      const venta = {
        date: date(),
        total: total(carrito),
        user_id : userId(),
        detail_order : detailOrder(carrito),
        state: false
      }
      console.log(venta);
      await axios.post("http://localhost:3001/venta", venta)
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
  },[])
  return (
    <div style={{width:"100%", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div>
        Su pago ha sido rechazado
      </div>
    </div>
  )
};

export default PayFailure;
