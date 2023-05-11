import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userId, date, detailOrder, total } from "./assistand";
import swal from 'sweetalert';
import axios from "axios"
import { removeShoppingCart } from '../../redux/actions';
import { Link } from 'react-router-dom';


function PaySuccess () {
  const dispatch = useDispatch();
  const { carrito, countCarrito } = useSelector((state) => state);
  useEffect(()=>{
    const postVenta = async () => {
      const venta = {
        date: date(),
        total: total(carrito),
        user_id : userId(),
        detail_order : detailOrder(carrito),
        state: true
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
      // window.localStorage.setItem("carrito", JSON.stringify([]));
      // window.localStorage.setItem("count", JSON.stringify(0));
      // dispatch(cleanShoppingCart());
      window.localStorage.setItem("remove", JSON.stringify(true));
      //put de venta y put de product
  },[dispatch])
  // const handlerInicio = () => {
  //   window.localStorage.setItem("remove", JSON.stringify(true));
  // }
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh"}}>
      <div style={{border:"solid 1px red"}}>
        <h1>Pago Exitoso</h1>
        <Link to="/">
          <button>Volver al inicio</button>
        </Link>
      </div>
    </div>
  )
};

export default PaySuccess;
