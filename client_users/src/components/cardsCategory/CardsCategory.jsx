import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getCategorys } from '../../redux/actions';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css"

function CardsCategory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(getAllProducts());
  }, [dispatch])

  const { categorys } = useSelector(state => state);
  
  return (
    <div className={styles.container}>
      {categorys?.map((category, index) => {
        return <CardCategory
          key={index}
          category_id={category.category_id}
          name={category.name}
          image={category.image}
          family={category.family}
        />

      })}
    </div>
  )
}

export default CardsCategory