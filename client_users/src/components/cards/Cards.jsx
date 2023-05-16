import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
// import {getAllProducts} from '../../redux/actions'
import Loader from "../loader/loader";
import { allProducts, getAllProducts, numberPage } from "../../redux/actions";
import { IoAlertCircleOutline } from 'react-icons/io5';
import BoxFilters from "../showFilters/BoxFilters";

const Cards = () => {
  const { productsFitered, copyProducts, products, display, page, activeFilter } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) dispatch(getAllProducts())
    window.localStorage.setItem("filtered", JSON.stringify(productsFitered));
    window.localStorage.setItem("copyProducts", JSON.stringify(copyProducts));
    window.localStorage.setItem("filtersActive", JSON.stringify(activeFilter))

    return () => {
      dispatch(allProducts(false))
    }
  }, [productsFitered, copyProducts, dispatch])
  // PAGINADO

  const [numeroPagina, setNumeroPagina] = useState(page);
  console.log('filtros ', Object.keys(activeFilter).length)


  const grupo = 12;
  const conteoFinal = page * grupo;
  const conteoInicial = conteoFinal - grupo;
console.log(productsFitered);
  const aux = 
    productsFitered.length > 0
      ? productsFitered.slice(conteoInicial, conteoFinal)
      : [];

      
console.log(aux);
  // useEffect(() => {
  //   setNumeroPagina(1)
  // }, [productsFitered])

  useEffect(() => {
    handlerScroll()
  }, [aux, numeroPagina])

  const paginas = [];

  const numPaginas = Math.ceil(productsFitered.length / grupo);

  for (let i = 1; i <= numPaginas; i++) {
    paginas.push(i);
  }
  //Scroll
  const handlerScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlerPage = (page) => {
    setNumeroPagina(page);
    dispatch(numberPage(page));
  };

  return (
    <div className={styles.container}>

      {display ? (
        <Loader />
      ) : (
        <>
          {Object.keys(activeFilter).length > 0 ? <BoxFilters activeFilter={activeFilter} /> : ''}
          <div className={styles.card}>

            {aux.length !== 0 ? aux.map((products, index) => (
             products.state === false 
             || products.stock === 0 
             ? null 
             : <Card key={index} producto={products} />
            )) : <div className={styles.alert} > 
            <IoAlertCircleOutline size={60}/>
            <p>No hay coincidencias</p> </div>}

          </div>
          {productsFitered.length >= 12 && (
            <div className={styles.paginado}>
              <div className={styles.paginadoAbj}>
                {/* ------------------------------CONTENEDOR PAGINADO------------------------------ */}
                <div>
                  {/* ------------------------------BOTON ATRAS------------------------------ */}
                  <button
                    className={styles.btnPag}
                    onClick={() => { handlerPage(page - 1); handlerScroll() }}
                    disabled={numeroPagina === 1}
                  >
                    {/* ◄ */}
                    {"<"}
                  </button>
                  {/* ------------------------------BOTONES PAGINAS------------------------------ */}
                  {paginas.map((pagina) => (
                    <button
                      key={pagina}
                      className={`${styles.btnPag} ${pagina === page ? styles.active : ""
                        }`}
                      onClick={() => { handlerPage(pagina); handlerScroll() }}
                    >
                      {pagina}
                    </button>
                  ))}
                  {/* ------------------------------BOTON PROXIMO------------------------------ */}
                  <button
                    className={styles.btnPag}
                    onClick={() => { handlerPage(page + 1); handlerScroll() }}
                    disabled={
                      numeroPagina === Math.ceil(productsFitered?.length / grupo)
                    }
                  >
                    {/* ► */}
                    {">"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cards;
