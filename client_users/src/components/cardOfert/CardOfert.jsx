import React from 'react'
import { Link } from 'react-router-dom'
import s from './cardOfert.module.css'

function CardOfert({ imagen, nombre, id, valor_normal, valor_con_descuento }) {

  function calcPorcentaje(a, b) {
    const diferencia_precio = a - b
    const dividido = diferencia_precio / a
    const porcentaje = dividido * 100
    return Math.floor(porcentaje) + '%'
  }


  return (
    <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
      <div className={s.container} style={{ backgroundImage: `url(${imagen})`, }}>
        <div className={s.text}>
          <h4 className={s.nombre}>{nombre}</h4>
          <h1 className={s.descuento}>{calcPorcentaje(valor_normal, valor_con_descuento)}</h1>
        </div>
      </div>
    </Link>
  )
}

export default CardOfert
