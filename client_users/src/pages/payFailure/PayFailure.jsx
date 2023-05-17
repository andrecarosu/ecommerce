import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userId, date, detailOrder, total } from "./assistand";
import swal from 'sweetalert';
import axios from "axios"
import { Redirect } from 'react-router-dom';


function PayFailure () {
  const url = process.env.REACT_APP_DEPLOYBACK_URL
  const dispatch = useDispatch();
  const { carrito } = useSelector((state) => state);

  //REDIRECCIONAMIENTO

    const [shouldRedirect, setShouldRedirect] = useState(false)

  //POST VENTA

  useEffect(()=>{
    const postVenta = async () => {
      const venta = {
        date: date(),
        total: total(carrito),
        detail_order : detailOrder(carrito),
        state: false
      }
      console.log(venta);
      await axios.post(`${url}/venta`, venta)
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
      if(carrito.length !== 0) postVenta();
    },[dispatch])
    
    //ANIMACIÓN

  const [size, setSize] = useState(0);
  const [percentage, setPercentage] = useState(50)
  
  useEffect(()=>{
    if(size < window.innerWidth){
      setTimeout(() => {
        setSize(prev => prev += 100)
      }, 90);
    }
    if(size >= window.innerWidth){
      setPercentage(0)
      swal({
        title: '¡No se pudo realizar la compra!',
        text: '¡Vuelva a intentar!',
        icon: 'error',
        timer: "4000"
        }) 
      setTimeout(() => {
        setShouldRedirect(true)
      }, 4000)
    }
  }, [size])

  return (
    <>
      {shouldRedirect ? (
        <Redirect to= "/shopping-cart"/>
        ) : (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", height:"100vh", overflow: "hidden"}}>
          <div style={{
            backgroundColor:"rgb(242,61,78)", 
            borderRadius:`${percentage}%`, 
            width:`${size}px`, 
            height:`${size}px`, 
            display:"flex", 
            justifyContent:"center", 
            alignItems:"center"}}>    
          </div>
        </div>
      )}
    </>  
  )
};

export default PayFailure;
