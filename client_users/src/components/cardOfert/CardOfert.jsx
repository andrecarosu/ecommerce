import React from 'react'
import { Link } from 'react-router-dom'
import s from './cardOfert.module.css'

function CardOfert({ image, name, product_id, normal_price, discount_price, brand, Category_product, discount}) {

  function calcPorcentaje(a, b) {
    const diferencia_precio = a - b
    const dividido = diferencia_precio / a
    const porcentaje = dividido * 100
    return Math.floor(porcentaje) + '%'
  }


  return (
    <Link className={s.link} to={`/detail/${product_id}`}>
      <div className={s.container}>
        <div className={s.img} style={{position:"relative"}}>
          <div style={{width:"100%", height:"100%", position:"absolute"}}>
            <img src={image} alt={name}/>
          </div>
          <div style={{position:"absolute", top:"15px", left:"15px", color:"white", background:"rgb(213,161,41)", padding:"5px"}}>
            <h4>{discount}% OFF</h4>
          </div>
        </div>
        <div className={s.precios}>
          <div>
            <h4 className={s.vNormal}>${normal_price}</h4>
          </div>
          <div>
            <h4 className={s.vDescuento}>${discount_price}</h4>
          </div>
        </div>
        <div className={s.text}>
          <h3 style={{fontWeight: 'bolder', fontSize:"20px"}}>{name}</h3>
          <span style={{fontWeight: 'bolder', fontSize:"15px"}}>{brand}</span>
          <span style={{fontWeight: 'bolder', color: "gray", fontSize:"13px"}}>{Category_product.name}</span>
        </div>
        
      </div>
    </Link> 
  )
}

export default CardOfert
