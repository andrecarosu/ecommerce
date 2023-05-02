import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";
import * as action from "../../redux/actions";

function Sidebar() {
  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);
  const [showOrdenar, setShowOrdenar] = useState(false);
  const [showPrecio, setShowPrecio] = useState(false);
  const [showTinto, setShowTinto] = useState(false);
  const [showBlanco, setShowBlanco] = useState(false);
  const [showRosado, setShowRosado] = useState(false);
  const [showBodega, setShowBodega] = useState(false);
  const [showOfertas, setShowOfertas] = useState(false)

  const handleClick = () => {
    setShowCategories(!showCategories);
  };
  const handleClick2 = () => {
    setShowOrdenar(!showOrdenar);
  };
  const handleClick3 = () => {
    setShowPrecio(!showPrecio);
  };
  const handleClickTinto = () => {
    setShowTinto(!showTinto);
  };
  const handleClickBlanco = () => {
    setShowBlanco(!showBlanco);
  };
  const handleClickRosado = () => {
    setShowRosado(!showRosado);
  };
  const handleClickBodega = () => {
    setShowBodega(!showBodega);
  };
  const handleClickOfertas = () => {
    setShowOfertas(!showOfertas);
  };

  return (
    <div className={styles.nav_contenedor}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => dispatch(action.getAllProducts())}
              >
                VER TODO
              </span>
            </div>
          </li>
          <hr />
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={handleClickOfertas}
              >
                OFERTAS
              </span>
            </div>
            {showOfertas && (
              <ul className={styles.list_show}>
                <li
                  tabindex="0"
                  className={styles.list_14}
                  onClick={() => dispatch(action.filterByOffers(20))}
                >
                  <span 
                    className={styles.nav_link}
                  >
                    20% OFF
                  </span>
                </li>
                <li
                  tabindex="0"
                  className={styles.list_15}
                  onClick={() => dispatch(action.filterByOffers(35))}
                >
                  <span className={styles.nav_link}>
                    35% OFF
                  </span>
                </li>
                <li
                  tabindex="0"
                  className={styles.list_15}
                  onClick={() => dispatch(action.filterByOffers(45))}
                >
                  <span className={styles.nav_link}>
                    45% OFF
                  </span>
                </li>
              </ul>
            )}
          </li>
          <hr />
          <li className={`${styles.list_item} ${styles.list_item_click}`}>
            <div className={`${styles.list_button} `}>
              <span 
                className={styles.nav_link} 
                onClick={handleClick}
              >
                VARIETALES
              </span>
            </div>
            {showCategories && (
              <>
              <ul>
                <li
                  tabindex="0"
                  className={styles.list_1}
                  >
                  <div>
                    <span className={styles.nav_link} onClick={handleClickTinto}>
                      Tinto
                    </span>
                  </div>
                  {showTinto && (
                    <ul className={styles.list_show}>
                        <li
                        tabindex="0"
                        className={styles.list_1}
                        onClick={() =>
                          dispatch(action.getProductByCategory("Cabernet Sauvignon "))
                        }
                      >
                        Cabernet Sauvignon
                      </li>
                      <li
                        tabindex="0"
                        className={styles.list_2}
                        onClick={() =>
                          dispatch(action.getProductByCategory("Malbec Tinto"))
                        }
                      >
                        Malbec
                      </li>
                      <li
                        tabindex="0"
                        className={styles.list_3}
                        onClick={() =>
                          dispatch(action.getProductByCategory("Merlot Tinto"))
                        }
                      >
                        Merlot
                      </li>
                      <li
                        tabindex="0"
                        className={styles.list_4}
                        onClick={() =>
                          dispatch(action.getProductByCategory("Syrah"))
                        }
                      >
                        Syrah
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  tabindex="0"
                  className={styles.list_1}
                  >
                  <div>
                    <span className={styles.nav_link} onClick={handleClickBlanco}>
                      Blanco
                    </span>
                  </div>
                  {showBlanco && (
                    <ul className={styles.list_show}>
                        <li
                          tabindex="0"
                          className={styles.list_5}
                          onClick={() =>
                            dispatch(action.getProductByCategory("Semillon"))
                          }
                        >
                          Semillón
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_6}
                          onClick={() =>
                            dispatch(action.getProductByCategory("Malbec Blanco"))
                          }
                        >
                          Malbec
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_7}
                          onClick={() =>
                            dispatch(action.getProductByCategory("Cosecha Tardía"))
                          }
                        >
                          Cosecha Tardía
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_8}
                          onClick={() =>
                            dispatch(action.getProductByCategory("Chardonnay"))
                          }
                        >
                          Chardonnay
                        </li>
                    </ul>
                  )}
                </li>
                <li
                  tabindex="0"
                  className={styles.list_1}
                  >
                  <div>
                    <span className={styles.nav_link} onClick={handleClickRosado}>
                      Rosado
                    </span>
                  </div>
                  {showRosado && (
                    <ul className={styles.list_show}>
                      <li
                        tabindex="0"
                        className={styles.list_9}
                        onClick={() =>
                          dispatch(action.getProductByCategory("Malbec Rose"))
                        }
                      >
                        Malbec Rosé
                      </li>
                      <li
                        tabindex="0"
                        className={styles.list_10}
                        onClick={() =>
                          dispatch(action.getProductByCategory("Merlot Rose"))
                        }
                      >
                        Merlot Rosé
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
              </>
            )}
          </li>
          <hr />
          <li className={styles.list_item}>
            <div className={styles.list_button}
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => handleClickBodega()}
              >
                BODEGA
              </span>
            </div>
            {showBodega && (
                <ul className={styles.list_show}>
                <li
                  tabindex="0"
                  className={styles.list_1}
                  onClick={() =>
                    dispatch(action.filterByBrand("Trapiche"))
                  }
                >
                  Trapiche
                </li>
                <li
                  tabindex="0"
                  className={styles.list_2}
                  onClick={() =>
                    dispatch(action.filterByBrand("El Esteco"))
                  }
                >
                  El Esteco
                </li>
                <li
                  tabindex="0"
                  className={styles.list_3}
                  onClick={() =>
                    dispatch(action.filterByBrand("Elementos"))
                  }
                >
                  Elementos
                </li>
                <li
                  tabindex="0"
                  className={styles.list_4}
                  onClick={() =>
                    dispatch(action.filterByBrand("Navarro Correas"))
                  }
                >
                  Navarro Correas
                </li>
                <li
                  tabindex="0"
                  className={styles.list_5}
                  onClick={() =>
                    dispatch(action.filterByBrand("Finca Las Moras"))
                  }
                >
                  Fincas las Moras
                </li>
              </ul>      
            )}
          </li>
          <hr />
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={handleClick3}
              >
                PRECIO
              </span>
            </div>
            {showPrecio && (
            <ul className={styles.list_show}>
              <li
                tabindex="0"
                className={styles.list_14}
                onClick={() => dispatch(action.orderedByHighestPrice())}
              >
                Mayor precio
              </li>
              <li
                tabindex="0"
                className={styles.list_15}
                onClick={() => dispatch(action.orderedByLowestPrice())}
              >
                Menor precio
              </li>
            </ul>
            )}
          </li>
          <hr />
          <li className={`${styles.list_item} ${styles.list_item_click}`}>
            <div className={`${styles.list_button} `}>
              <span className={styles.nav_link} onClick={handleClick2}>
                ORDENAR :
              </span>
            </div>
            {showOrdenar && (
              <ul className={styles.list_show}>
                <li
                  tabindex="0"
                  className={styles.list_14}
                  onClick={() => dispatch(action.orderedByHighestPrice())}
                >
                  Mayor precio
                </li>
                <li
                  tabindex="0"
                  className={styles.list_15}
                  onClick={() => dispatch(action.orderedByLowestPrice())}
                >
                  Menor precio
                </li>
                <li
                  tabindex="0"
                  className={styles.list_12}
                  onClick={() => dispatch(action.orderedByNameASC())}
                >
                  A-Z
                </li>
                <li
                  tabindex="0"
                  className={styles.list_13}
                  onClick={() => dispatch(action.orderedByNameDESC())}
                >
                  Z-A
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
