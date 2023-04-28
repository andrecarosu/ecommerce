import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductByCategory } from '../../redux/actions';
import s from './CardCategory.module.css'

function CardCategory({name, image,family}) {
    const dispatch = useDispatch();
  const handlerCategory = () => {
    dispatch(getProductByCategory(family))
  }
 

  return (
    <Link className={s.link} to="/home" onClick={handlerCategory} >
      <div className={s.container}>
        <h4 className={s.nombre}>{name}</h4>
        <div className={s.box}>
          <div style={{backgroundImage: `url(${image})`}} className={s.imagen}></div>
        </div>
        <span className={s.vermas}>Explorar más...</span>
      </div>
    </Link>
  )
}

export default CardCategory