import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";
import * as action from "../../redux/actions";

function Sidebar() {
  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);

  const [filters, setFilters] = useState(null)
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
  const handleClickFilterCategory = (value) => {
    console.log(value)
    dispatch(action.getProductByCategory(value))
    setFilters({ Category: value })
  }

  return (
    <div className={styles.nav_contenedor} onClick={() => dispatch(action.numberPage(1))}>
      {filters && <div className={styles.filtersContainer}>
        <span className={`${styles.filterMessage} ${styles.filterCont}`}><strong>Filtrando por</strong></span>
        {filters && Object.keys(filters).map((key, index) => {
          return (
            <React.Fragment key={index}>
              <span className={styles.filterMessage}>
                {<>
                  <strong>{key}: </strong>
                  {filters[key]}
                </>
                }
              </span>
            </React.Fragment>
          )
        })}
      </div>}
      <nav className={styles.nav}>

        <ul className={styles.list}>
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => {
                  dispatch(action.getAllProducts());
                  dispatch(action.allProducts(true));
                  setFilters(null)
                  dispatch(action.setFiltersActive())
                }}
              >
                VER TODO
              </span>
            </div>
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
                            handleClickFilterCategory("Cabernet Sauvignon ")
                          }
                        >
                          Cabernet Sauvignon
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_2}
                          onClick={() =>
                            handleClickFilterCategory("Malbec Tinto")
                          }
                        >
                          Malbec
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_3}
                          onClick={() =>
                            handleClickFilterCategory("Merlot Tinto")
                          }
                        >
                          Merlot
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_4}
                          onClick={() =>
                            handleClickFilterCategory("Syrah")
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
                            handleClickFilterCategory("Semillon")
                          }
                        >
                          Semillón
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_6}
                          onClick={() =>
                            handleClickFilterCategory("Malbec Blanco")
                          }
                        >
                          Malbec
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_7}
                          onClick={() =>
                            handleClickFilterCategory("Cosecha Tardía")
                          }
                        >
                          Cosecha Tardía
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_8}
                          onClick={() =>
                            handleClickFilterCategory("Chardonnay")
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
                            handleClickFilterCategory("Malbec Rose")
                          }
                        >
                          Malbec Rosé
                        </li>
                        <li
                          tabindex="0"
                          className={styles.list_10}
                          onClick={() =>
                            handleClickFilterCategory("Merlot Rose")
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
            <div className={styles.list_button}>
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => handleClickBodega()}
              >
                BODEGAS
              </span>
            </div>
            {showBodega && (
              <ul className={styles.list_show}>
                <li
                  tabindex="0"
                  className={styles.list_1}
                  onClick={() => {
                    dispatch(action.filterByBrand("Trapiche"))
                    setFilters({ ...filters, Marca: "Trapiche" })
                  }
                  }
                >
                  Trapiche
                </li>
                <li
                  tabindex="0"
                  className={styles.list_2}
                  onClick={() => {
                    dispatch(action.filterByBrand("El Esteco"))
                    setFilters({ ...filters, Marca: "El Esteco" })
                  }
                  }
                >
                  El Esteco
                </li>
                <li
                  tabindex="0"
                  className={styles.list_3}
                  onClick={() => {
                    dispatch(action.filterByBrand("Elementos"))
                    setFilters({ ...filters, Marca: "Elementos" })
                  }
                  }
                >
                  Elementos
                </li>
                <li
                  tabindex="0"
                  className={styles.list_4}
                  onClick={() => {
                    dispatch(action.filterByBrand("Navarro Correas"))
                    setFilters({ ...filters, Marca: "Navarro Correas" })
                  }
                  }
                >
                  Navarro Correas
                </li>
                <li
                  tabindex="0"
                  className={styles.list_5}
                  onClick={() => {
                    dispatch(action.filterByBrand("Finca Las Moras"))
                    setFilters({ ...filters, Marca: "Finca Las Moras" })
                  }
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
                  onClick={() => {
                    dispatch(action.filterByOffers(20))
                    setFilters({ ...filters, Oferta: "20%" })
                  }}
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
                  onClick={() => {
                    dispatch(action.filterByOffers(35))
                    setFilters({ ...filters, Oferta: "35%" })
                  }}
                >
                  <span className={styles.nav_link}>
                    35% OFF
                  </span>
                </li>
                <li
                  tabindex="0"
                  className={styles.list_15}
                  onClick={() => {
                    dispatch(action.filterByOffers(45))
                    setFilters({ ...filters, Oferta: "45%" })
                  }}
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
              <span className={styles.nav_link} onClick={handleClick2}>
                ORDENAR
              </span>
            </div>
            {showOrdenar && (
              <ul className={styles.list_show}>
                <li
                  tabindex="0"
                  className={styles.list_14}
                  onClick={() => {
                    dispatch(action.orderedByHighestPrice())
                    setFilters({ ...filters, Orden: "Mayor Precio" })
                  }}
                >
                  Mayor precio
                </li>
                <li
                  tabindex="0"
                  className={styles.list_15}
                  onClick={() => {
                    dispatch(action.orderedByLowestPrice())
                    setFilters({ ...filters, Orden: "Menor Precio" })
                  }}
                >
                  Menor precio
                </li>
                <li
                  tabindex="0"
                  className={styles.list_12}
                  onClick={() => {
                    dispatch(action.orderedByNameASC())
                    setFilters({ ...filters, Orden: "A-Z" })
                  }}
                >
                  A-Z
                </li>
                <li
                  tabindex="0"
                  className={styles.list_13}
                  onClick={() => {
                    dispatch(action.orderedByNameDESC())
                    setFilters({ ...filters, Orden: "Z-A" })
                  }}
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
