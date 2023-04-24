import React from 'react'
import { Link } from 'react-router-dom'
import s from './Card.module.css'


const Card = ({producto}) => {
const {nombre, valor_normal,valor_con_descuento, imagen, id_producto, Categoria_producto}=producto;
console.log("CATEGORIA: ", Categoria_producto)
  return (
    <Link className={s.link} to={`/detail/${id_producto}`}>
    <div className={s.container}>
      <div className={s.img}>
        <img src={imagen} alt={nombre} />
      </div>
      <div className={s.precios}>
      <h4 className={s.vNormal}>${valor_normal}</h4>
      <h4 className={s.flecha}>→</h4>
      <h4 className={s.vDescuento}>${valor_con_descuento}</h4>
      </div>
      <div className={s.text}>
      <span style={{fontWeight: 'bolder'}}>{nombre}</span>
      <span style={{fontWeight: 'lighter'}}>{Categoria_producto.nombre_categoria_producto}</span>
      </div>
      
    </div>
    </Link> 
  )
}

export default Card
