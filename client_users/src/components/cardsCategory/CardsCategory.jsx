import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanShoppingCart, getAllProducts, getCategorys, getFamilies } from '../../redux/actions';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css"
import Loader from '../loader/loader';

function CardsCategory() {
  const dispatch = useDispatch();
  const { categorys, families, products, display } = useSelector(state => state);

  useEffect(() => {
    const remove = JSON.parse(window.localStorage.getItem("remove"))
    if(remove){
      window.localStorage.setItem("carrito", JSON.stringify([]));
      window.localStorage.setItem("count", JSON.stringify(0));
      dispatch(cleanShoppingCart());
      window.localStorage.setItem("remove", JSON.stringify(false));
    }
    if(categorys?.length === 0) dispatch(getCategorys())
    if(products?.length === 0) dispatch(getAllProducts())
    if(families?.length === 0) dispatch(getFamilies())    
  }, [dispatch])

  return (
    <div style={{display:"flex", alignItems:"center"}}>
      {display ? (
        <Loader />
      ) : (
      <div style={{margin: "0px 20px 0px 20px", display:"inline-block"}}>
        {families?.map((family, index) => {
          return(
            <div key={index}>
              <h2>{ family.family }</h2>
              <div className={styles.container}>
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
      )}
    </div>  
  )
}

export default CardsCategory