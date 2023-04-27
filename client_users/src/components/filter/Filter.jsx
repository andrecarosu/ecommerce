// import React from "react";
// import { connect } from "react-redux";
// import styles from "./Filter.module.css";
// import {
//   getAllProducts,
//   getProductByCategory,
//   filterByNewProducts,
//   filterByRefurbishedProducts,
//   filterByUsedProducts,
//   filterByCategory,
//   orderedByNameASC,
//   orderedByNameDESC,
//   orderedByLowestPrice,
//   orderedByHighestPrice
// } from "../../redux/actions";

// function Filter(props) {

//   /* FILTRO POR NOMBRE */
//   function handleOrderAlf(e) {
//     if (e.target.value === "Ordenar alfabeticamente") {
//       props.getAllProducts();
//     } else if (e.target.value === "A-Z") {
//       props.orderedByNameASC()
//     } else {
//       props.orderedByNameDESC()
//     }
//   }


//   /* FILTRO POR CONDICION */

//   function handleFilterCondition(e) {
//     if (e.target.value === "Filtro por condicion") {
//       props.getAllProducts();
//     } else if (e.target.value === "Usado") {
//       props.filterByUsedProducts();
//     } else if (e.target.value === "Nuevo") {
//       ;
//       props.filterByNewProducts();
//     } else if (e.target.value === "Reacondicionado") {
//       props.filterByRefurbishedProducts();
//     }
//   }

//   /* FILTRO POR PRECIO */

//   function handleFilterPrice(e) {
//     if (e.target.value === "Filtro por precio") {
//       props.getAllProducts()
//       console.log("Trae todos los productos");
//     } else if (e.target.value === "Asc") {
//       props.orderedByLowestPrice()
//       console.log("Filtro por precio ascendente");
//     } else {
//       props.orderedByHighestPrice()
//       console.log("Filtro por precio descendente");
//     }
//   }

//   /* FILTRO POR CATEGORIA */

//   // function handleSelectCategory(e) {
//   //   if (e.target.value === "Filtro por categoria") {
//   //     props.getAllProducts()
//   //   } else {
//   //     props.filterByCategory(e.target.value)
//   //     console.log(props.filterByCategory(e.target.value))
//   //   }
//   //   /*// } else if (e.target.value === "Cosmetica") {
//   //   //   console.log("Filtra por Cosmetica");
//   //   // } else if (e.target.value === "Electronica") {
//   //   //   console.log("Filtra por Electronica");
//   //   // } else if (e.target.value === "Indumentaria") {
//   //   //   console.log("Filtra por Indumentaria");
//   //   // } else if (e.target.value === "Alimentos") {
//   //   //   console.log("Filtra por Alimentos");
//   //   // } else if (e.target.value === "Accesorios") {
//   //   //   console.log("Filtra por Accesorios");
//   //   // } else if (e.target.value === "Muebles") {
//   //   //   console.log("Filtra por Muebles");
//   //   // } else if (e.target.value === "Jardineria") {
//   //   //   console.log("Filtra por Jardineria");
//   //   // } else if (e.target.value === "Deportes") {
//   //   //   console.log("Filtra por Deportes");
//   //   // } else if (e.target.value === "Joyeria") {
//   //   //   console.log("Filtra por Joyeria");
//   //   // } else if (e.target.value === "Herramientas") {
//   //   //   console.log("Filtra por Herramientas");
//   //   // }*/
//   // }

//   return (
//     <div className={styles.contenedor}>

//       {/* --------------------ORDENAR POR PRECIO--------------------*/}
//       <div>
//         <select
//           className={styles.filtro}
//           name="Price"
//           onChange={(e) => handleFilterPrice(e)}
//         >
//           <option value="Filtro por precio">Filtro por precio</option>
//           <option value="Asc">Ascendente</option>
//           <option value="Des">Descendente</option>
//         </select>
//       </div>
//       {/* --------------------ORDENAR POR CONDICION--------------------*/}
//       <div>
//         <select
//           className={styles.filtro}
//           name="Condition"
//           onChange={(e) => handleFilterCondition(e)}
//         >
//           <option value="Filtro por condicion">Filtro por condición</option>
//           <option value="Usado">Usado</option>
//           <option value="Nuevo">Nuevo</option>
//           <option value="Reacondicionado">Reacondicionado</option>
//         </select>
//       </div>
//       {/* --------------------ORDENAR ALFABETICAMENTE--------------------*/}
//       <div>
//         <select
//           className={styles.filtro}
//           name="Alfabeticamente"
//           onChange={(e) => handleOrderAlf(e)}
//         >
//           <option value="Ordenar alfabeticamente">Ordenar alfabeticamente</option>
//           <option value="A-Z">A-Z</option>
//           <option value="Z-A">Z-A</option>
//         </select>
//       </div>
//       {/* --------------------ORDENAR POR CATEGIRIA--------------------*/}
//       {/* <div>
//       <select
//   className={styles.filtro}
//   name="Condition"
//   onChange={(e) => handleSelectCategory(e)}
// >
//   <option value="">Selecciona una categoría</option>
//   {categorias && categorias.map((c) => {
//     console.log(c.nombre_categoria_producto);
//     return <option value={c.nombre_categoria_producto}>{c.nombre_categoria_producto}</option>;
//   })}
// </select>
//       </div> */}
//     </div>
//   );
// }
// function mapStateToprops(state) {
//   return {
//     products: state.products,
//     categorias: state.categorias,
//     filtered: false,
//   };
// }

// export default connect(mapStateToprops,
//   {
//     getAllProducts,
//     getProductByCategory,
//     filterByNewProducts,
//     filterByRefurbishedProducts,
//     filterByUsedProducts,
//     filterByCategory,
//     orderedByNameASC,
//     orderedByNameDESC,
//     orderedByLowestPrice,
//     orderedByHighestPrice
//   })(
//     Filter
//   );
