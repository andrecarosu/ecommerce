import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getCategorys, getFamilies } from '../../redux/actions';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css"

function CardsCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getAllProducts());
    dispatch(getFamilies())
  }, [dispatch])

  const { categorys, families } = useSelector(state => state);
  
  return (
    <div>
      {families?.map((family, index) => {
        return(
          <div key={index}>
            <h2>{ family.family }</h2>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
              {family.categories?.map((category, index) => (
                <CardCategory
                  key={index}
                  category_id={category.category_id}
                  name={category.name}
                  image={category.image}
                  family={category.family}
                />
              ))}
            </div>
          </div>
        )})}
    </div>  
  )
}

export default CardsCategory