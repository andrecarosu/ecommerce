import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userId, date, detailOrder, total } from "./assistand";
import swal from 'sweetalert';
import axios from "axios"
import { cleanShoppingCart } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { TiTick } from 'react-icons/ti';


function PaySuccess () {
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);
  console.log(userId());
  useEffect(()=>{
    // const postVenta = async () => {
    //   const venta = {
    //     date: date(),
    //     total: total(carrito),
    //     user_id : userId(),
    //     detail_order : detailOrder(carrito),
    //     state: true
    //   }
    //   console.log(venta);
    //   await axios.post("http://localhost:3001/venta", venta)
    //     .then(response => {
    //       console.log(response.data);
    //     })
    //     .catch(error => {
    //       swal({
    //         title: "Ocurrio un error",
    //         text: `${error}`,
    //         icon: "error",
    //         timer: "3000"
    //       })
    //     })
    //   };
    //   postVenta();
      window.localStorage.setItem("carrito", JSON.stringify([]));
      window.localStorage.setItem("count", JSON.stringify(0));
      dispatch(cleanShoppingCart())
    },[dispatch])
  const [size, setSize] = useState(0);
  const [percentage, setPercentage] = useState(50)
  const [showMessage, setShowMessage] = useState(false)
  // console.log(ancho, alto);
  useEffect(()=>{
    if(size < window.innerWidth){
      setTimeout(() => {
        setSize(prev => prev += 100)
      }, 90);
    }
    if(size >= window.innerWidth){
      setPercentage(0)
      setShowMessage(!showMessage)
      console.log(percentage);
    }
  }, [size])
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh", overflow: "hidden"}}>
      <div style={{backgroundColor:"rgb(58,181,74)", borderRadius:`${percentage}%`, width:`${size}px`, height:`${size}px`, display:"flex", justifyContent:"center", alignItems:"center"}}>    
        {size < window.innerWidth ? (
          null
        ) : (
          <div>
            <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:"80px", margin:"20px"}}/>
            <h1>¡Compra éxitosa!</h1>
          </div>
        )}
      </div>
    </div>
  )
};

export default PaySuccess;
