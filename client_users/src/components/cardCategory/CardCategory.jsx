import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductByCategory } from '../../redux/actions';
import s from './CardCategory.module.css'

function CardCategory({name, image, family}) {
    const dispatch = useDispatch();
  const handlerCategory = () => {
    dispatch(getProductByCategory(name))
  }
 
  return (
    <Link className={s.link} to="/product" onClick={handlerCategory} >
      {/* <div style={{with:"25%", border:"solid 1px black"}}> */}
        <div className={s.container}>
          <img src={image} alt={name} className={s.image}/>
        </div>
      {/* </div> */}
    </Link>
  )
}

export default CardCategory