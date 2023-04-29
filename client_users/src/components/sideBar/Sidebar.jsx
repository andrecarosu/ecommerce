import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Sidebar.module.css";
import * as action from "../../redux/actions";

function Sidebar() {
  const dispatch = useDispatch();
  const [showCategories, setShowCategories] = useState(false);
  const [showOrdenar, setShowOrdenar] = useState(false);
  const [showCondicion, setShowCondicion] = useState(false);
  const [showPrecio, setShowPrecio] = useState(false);
  const [showTinto, setShowTinto] = useState(false);
  const [showBlanco, setShowBlanco] = useState(false);
  const [showRosado, setShowRosado] = useState(false);



  const handleClick = () => {
    setShowCategories(!showCategories);
  };
  const handleClick2 = () => {
    setShowOrdenar(!showOrdenar);
  };
  const handleClick3 = () => {
    setShowPrecio(!showPrecio);
  };
    const handleClick4 = () => {
    setShowCondicion(!showCondicion);
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
  return (
    <div className={styles.nav_contenedor}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASBJREFUSEvllIENwkAMA80msAlsApMAk8AmsAlsAjqpfrnPA20lkBCR0NN8aidO0pk+bLMP4+sZwUHSeiT5XtJR0jXfaxHsJG1HgjscEt4vVhPMJV2625Wks6SlpFP3Hx/GM/5Nl7VjuFtkFTWBpQHYYK4os3PcO1+vB5lFEjtbV0SW9AeSTITqieUsVSQQ0nBZ63jrZMnYlDL9rrYQtwhSwwQa42eSiO9JlPrTPMCZJqTDyGqon3EltkeQ2dZTSkbcD/UXZeopst4GdCaAUyEnP/z0Cku/E3hLMPUT8jAQzyr4KgFNzmZbBpqOTJy2SRV4Pxo97i0a95MIWovWBPsPgld6t3rQ8pXPRL3JPDMxXpyhgBn3MFlT530w+e8T3AEGdlkZEzbOHwAAAABJRU5ErkJggg==" />
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => dispatch(action.getAllProducts())}
              >
                Ver Todo
              </span>
            </div>
          </li>
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAO9JREFUSEu9ld0NwjAMhK+wCGwC0yDEPog3RoFRWASBDiWouLbPQpS+WE0Ufz7/JANm/oaZ/ePvgAuATUHVDcAWAG36WQUPdWC0X4JEgCx1KwBUSishFcASwN0oK0MU4ARgB4B2/w0kAyxM5F7apBKl4Ngipz0EDZBCFKDaVCHkVwAGYiFrLkYAbsohcop+boN6bYM4AfRJlv2dOOfZV/SeAtkVTlF4pkf+4dwDeLnM7pzUeQSoQqTzDKAgJecKEEG4Hubc1qjy4NjCs5B8MyYF9aayArBK+F9yXknROKied9p3n6u7pKpA+Qn3Zwc8AW5bTxlAMFd1AAAAAElFTkSuQmCC" />
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => dispatch(action.filterByOffers())}
              >
                Ofertas
              </span>
            </div>
          </li>
          <li className={`${styles.list_item} ${styles.list_item_click}`}>
            <div className={`${styles.list_button} `}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANBJREFUSEvtlckNAjEQBGszgUwgE4gEiAQRCWQCmYBaspHv2QOLz/pjyWNP9bSvgc5t6JyfsYAdcALUv4AHcHN9U+MYwAG4VrJcgHOLYAGk+O4S+GQbQFBVpLZvVWIBpFzJSkp9ZbJLkGKzAE9AirfO+zCJxhXXnig+C/B2q2pCrHh2iuS3fF/SoopSZV7REoDWfvPWAH7csiCNZ/P/Dphq1eQKVkB2D6xTY1m27oHlEKZFv3iLouc7vcnh12jKLUzQQ3cMPyDrP5gDidZ0B3wAmnU0GbcMQx8AAAAASUVORK5CYII=" />
              <span className={styles.nav_link} onClick={handleClick}>
                Varietales
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
          <li className={`${styles.list_item} ${styles.list_item_click}`}>
            <div className={`${styles.list_button} `}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQhJREFUSEvVlA0OAUEMhd/ehJtwEpwEJ8FJuAk3IZ9MN2MzM621JJqIv51+r33tdPpydF/OryhgJmkraZEE3SRtJPHejAiA5NdKlrkHiQAOktaSLpL2CWTV8H3XKiECuKcEuVpadU7q+b0aEUDpsLUNDyYHoN5adExmT1YBbcknaTmFybk68wPlp2T8x2NqCfJxdcfTDkVNHu4C5rrtARIB2EjyPLsAjBfhVuIBhslRTdjy8ZkrA0+K0QKwvSQiSuPIBjOuRHWja4CoQhdSAuSzTkvoeyuArJIvVEK1/S07BLyb3MB4RdWYj6D+Ks8BeVsc0e7fQJ4D8VOAK2vMA94ejMn5cub/AQ9dbTkZoV0kIAAAAABJRU5ErkJggg==" alt="icono"/>
              <span className={styles.nav_link} onClick={handleClick2}>
                Ordenar
              </span>
            </div>
            {showOrdenar && (
              <ul className={styles.list_show}>
                <li
                  tabindex="0"
                  className={styles.list_12}
                  onClick={() => dispatch(action.orderedByNameASC())}
                >
                  Por nombre a-z
                </li>
                <li
                  tabindex="0"
                  className={styles.list_13}
                  onClick={() => dispatch(action.orderedByNameDESC())}
                >
                  Por nombre z-a
                </li>
              </ul>
            )}
          </li>
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWBJREFUSEu1lY1NwzAQhV8noWwCk1AmASaBTgKbAJOAvsgvul58iUuppaqtcrl378f2Tldeuyv31wjAnaRXSUdJb22gg6QHSY+SPtaGHAF4lwQI60vSPjTk/+25ADRgwpvWzM2rPmbF85c2xFzbY4AcAPxlAfAcXzwXwPU/BTps8GWVQdTchRjJdDYUhk/JD2p5fl8BOC3RROt6Qrs1oO6zwwTjAeH7JKYVbVJCsb3ht+PZY+u0TemKHlTmZoAR82cvIkBFOSeDOj5Iig+95aEWO7knE5KwizEw71rMhnlcpQej+Z/Mazu4Yt2ViETkBLkRTUkSkpiRk1WxXphMc1KRQRabJ+hh0CzRfAjmnUxzpMrnDyD2gWZV3epG8xRrXvzLUdGjPZJ9aobOonhc89LWyYosGP/dAJyyaaitCydrnS+cheaZ6haADSVdmIx8ZkhkOdQuvjJH9e/WjTC4COAXAcVVGWZcFaYAAAAASUVORK5CYII=" alt="icono"/>
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={handleClick3}
              >
                Precio
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
          <li className={styles.list_item}>
            <div className={styles.list_button}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAANhJREFUSEvtldENgzAMRI9N2k3KJmWSqpO0m5RNyiZUR+MoorbjCPFRCT7D5Z4526LDzk+3sz8OQDXhMqIXgEv1RkwwAThTWgLm2N2wavHeAngCuDq4TYAewAjg4UDCAJox03eqlsY84+P17QfAC6dUVdnsIQFolptnmBMu+qUCbdEIkWrXEUs0LIBA630+tzZZmygx9wrgaPIrTYAWEcVa7uveiM6MyNoDK/eyN9q0hqeI804zK3drFcIAGtwB3MI7/BU2ARq9dYC3la2APBTHD6ca3f9H9AET9TAZjvnCQgAAAABJRU5ErkJggg==" />
              <span
                tabindex="0"
                className={styles.nav_link}
                onClick={() => dispatch(action.orderedByRecientes())}
              >
                Recientes
              </span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
