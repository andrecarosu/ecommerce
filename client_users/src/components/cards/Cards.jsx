import React,{useEffect, useState} from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";
import { useDispatch, useSelector} from "react-redux";
// import {getAllProducts} from '../../redux/actions'
import Loader from "../loader/loader";
import { numberPage } from "../../redux/actions";
import { IoAlertCircleOutline } from 'react-icons/io5';

const Cards = () => {
  const { productsFitered, copyProducts, products ,display, page } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    window.localStorage.setItem("products", JSON.stringify(products));
    window.localStorage.setItem("filtered", JSON.stringify(productsFitered));
    window.localStorage.setItem("copyProducts", JSON.stringify(copyProducts));
  },[products, productsFitered, copyProducts])
  // PAGINADO

  const [numeroPagina, setNumeroPagina] = useState(page);

  const grupo = 12;
  const conteoFinal = numeroPagina * grupo;
  const conteoInicial = conteoFinal - grupo;

  const aux =
    productsFitered && productsFitered.slice
      ? productsFitered.slice(conteoInicial, conteoFinal)
      : [];

      

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
}

const handlerPage = (page) => {
  setNumeroPagina(page);
  dispatch(numberPage(page));
}
  return (
    <div className={styles.container}>
      
      {display ? (
        <Loader />
      ) : (
        <>
          <div className={styles.card}>
            {aux.length ? aux.map((products, index) => (
             products.state === false || products.stock === 0 ? null : <Card key={index} producto={products} />
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
                  onClick={() => {handlerPage(numeroPagina - 1); handlerScroll()}}
                  disabled={numeroPagina === 1}
                >
                  {/* ◄ */}
                  {"<"}
                </button>
                {/* ------------------------------BOTONES PAGINAS------------------------------ */}
                {paginas.map((pagina) => (
                  <button
                    key={pagina}
                    className={`${styles.btnPag} ${
                      pagina === numeroPagina ? styles.active : ""
                    }`}
                    onClick={() => {handlerPage(pagina); handlerScroll()}}
                  >
                    {pagina}
                  </button>
                ))}
                {/* ------------------------------BOTON PROXIMO------------------------------ */}
                <button
                  className={styles.btnPag}
                  onClick={() => {handlerPage(numeroPagina + 1); handlerScroll()}}
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
