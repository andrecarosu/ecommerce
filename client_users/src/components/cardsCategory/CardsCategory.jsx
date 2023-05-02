import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getCategorys, getFamilies } from '../../redux/actions';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css"

function CardsCategory() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);// variable booleana para verificar si los datos están listos

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // establecer la variable loading en true antes de hacer la petición
      setTimeout(async() => {
       await dispatch(getCategorys())
       await dispatch(getAllProducts())
       await dispatch(getFamilies())
        setLoading(false); // establecer la variable loading en false cuando los datos hayan sido cargados
      }, 2000); // esperar 2 segundos antes de obtener los datos
    }
    fetchData();    
  }, [dispatch])

  const { categorys, families } = useSelector(state => state);

  if (loading) {
    return (
      <div >
        <div >Loading...</div>
        <img className={styles.imagenLoading} src="/bebidas-premium-home.gif" alt="" />
              
      </div> 
    );
  }
  
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