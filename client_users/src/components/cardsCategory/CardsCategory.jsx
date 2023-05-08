import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getCategorys, getFamilies } from '../../redux/actions';
import CardCategory from '../cardCategory/CardCategory';
import styles from "./CardsCategory.module.css";
import axios from 'axios';

function CardsCategory() {
  const dispatch = useDispatch();
  //const [loading, setLoading] = useState(true);// variable booleana para verificar si los datos están listos
  const[families, setFamilies] = useState({})

  useEffect(() => {

    (async () =>{
    
      const response2 = await axios.get(`https://ecommerce-khaki-nine.vercel.app/categorias/families`);
      const familiesData = response2.data;
      if (familiesData.length >0) {
        setFamilies(familiesData)        
      }
    })()
    //async function fetchData() {
     // setLoading(true); // establecer la variable loading en true antes de hacer la petición
      //setTimeout(() => {
      //  await dispatch(getCategorys())
      //  await dispatch(getAllProducts())
       //dispatch(getFamilies())
       // setLoading(false); // establecer la variable loading en false cuando los datos hayan sido cargados
      //}, 2000); // esperar 2 segundos antes de obtener los datos
    //}
    //fetchData();    
  }, [dispatch,setFamilies])



  //const  families = useSelector(state => state.families)??[]

  //if (loading) {
    //return (
  //     <div >
  //       <div >Loading...</div>
  //       <img className={styles.imagenLoading} src="/bebidas-premium-home.gif" alt="" />
              
  //     </div> 
  //   );
  // }
 
  return (
    <div style={{display:"flex", alignItems:"center"}}>
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
        )}
        )}
        </div>
        </div>
        //}
   // </div>  
  )
}

export default CardsCategory