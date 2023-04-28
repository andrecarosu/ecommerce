import React from 'react'
import { Link } from 'react-router-dom'
import s from './Card.module.css'


const Card = ({producto}) => {
const {name, normal_price,discount_price, image, product_id, Category_product}=producto;
console.log("CATEGORIA: ", Category_product)
  return (
    <Link className={s.link} to={`/detail/${product_id}`}>
    <div className={s.container}>
      <div className={s.img}>
        <img src={image} alt={name} />
      </div>
      <div className={s.precios}>
      <h4 className={s.vNormal}>${normal_price}</h4>
      <h4 className={s.flecha}>→</h4>
      <h4 className={s.vDescuento}>${discount_price}</h4>
      </div>
      <div className={s.text}>
      <span style={{fontWeight: 'bolder'}}>{name}</span>
      <span style={{fontWeight: 'lighter'}}>{Category_product.name}</span>
      </div>
      
    </div>
    </Link> 
  )
}

export default Card
