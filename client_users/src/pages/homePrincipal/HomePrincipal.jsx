import React, { useEffect, useState } from "react";
import CardsCategory from "../../components/cardsCategory/CardsCategory";
import Carousel from "../../components/carousel/Carousel";
import styles from "./homePrincipal.module.css"

function HomePrincipal() {


  // const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true); // establecer la variable loading en true antes de hacer la petición
  //     setTimeout(async() => {
  //     setLoading(false); // establecer la variable loading en false cuando los datos hayan sido cargados
  //     }, 2000); // esperar 2 segundos antes de obtener los datos
  //   }
  //   fetchData();    
  // }, [])
=======
  useEffect(() => {
    async function fetchData() {
      setLoading(true); // establecer la variable loading en true antes de hacer la petición
      setTimeout(async() => {
      setLoading(false); // establecer la variable loading en false cuando los datos hayan sido cargados
      }, 1000); // esperar 2 segundos antes de obtener los datos
    }
    fetchData();    
  }, [])
>>>>>>> 41fe6b3d543fe6d81480770dfacc49e8c4b3e8f5

  // if (loading) {
  //   return (
  //     <div >
  //       <div >Loading...</div>
  //       <img className={styles.imagenLoading} src="/bebidas-premium-home.gif" alt="" />
              
  //     </div> 
  //   );
  // }

  return (
    <div style={{ minHeight: '100vh', marginTop:"100px" }}>
      <Carousel numSlides={5} speed={2000} />
      <hr style={{width: '85%', margin: '20px auto'}}/>
      <div>
        <h1 style={{textAlign: 'left', marginLeft: '80px'}}>Explora por varietales</h1>
      <CardsCategory />
      </div>
    </div>
  );
}

export default HomePrincipal;
