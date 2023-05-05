import axios from "axios";
import * as action from "./actions-type"; // para no escribir todos los action types los obtuve todos con el uso del * y lo renombre como action...para usar colocar la palabra action.[nombre del action-type]

const URL = "https://deploynodejsecommerce.onrender.com";
// ========================* CARRITO *========================
export function actualizarStock(arrayProductos) {
  axios.put(`${URL}/products`)
}

export function agregarAlCarrito(product, quantity) {
  console.log(product);
  return {
    type: action.AGREGAR_AL_CARRITO,
    payload: { product, quantity },
  };
}

export function eliminarDelCarrito(id) {
  return {
    type: action.BORRAR_DEL_CARRITO,
    payload: id,
  };
}

export function restarCantidad(id) {
  return {
    type: action.RESTAR_CANTIDAD_CARRITO,
    payload: id,
  };
}

export function sumarCantidad(id) {
  return {
    type: action.SUMAR_CANTIDAD_CARRITO,
    payload: id,
  };
}

export function agregarCount(quantity) {
  return {
    type: action.COUNT_AGREGAR,
    payload: quantity
  }
}

export function sumarCount() {
  return {
    type: action.COUNT_SUMAR,
  }
}

export function restarCount() {
  return {
    type: action.COUNT_RESTAR,
  }
}

export function deleteCount(quantity) {
  return {
    type: action.COUNT_DELETE,
    payload: quantity
  }
}

// ========================* USUARIOS *========================
export function registerUser() {
  return () => {
    axios
      .post(`${URL}/usuario`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
}

export function userLoggedIn(estado) {
  return {
    type: action.USER_LOGIN,
    payload: estado,
  };
}

export function getUsuarioByEmail(email) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/email?email=${email}`);
      console.log(response);

      dispatch({
        type: action.GET_USER_BY_EMAIL,
        payload: response.data,
      });
    } catch (error) {
      console.log(error, "No se encontro usuario con ese email");
      dispatch({
        type: action.GET_USER_BY_EMAIL,
        payload: error,
      });
    }
  };
}

export function putUser(userId, userData) {
  return () => {
    axios
      .put(`${URL}/usuario/${userId}`, userData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
}

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch(loading());
    const res = await axios.get(`${URL}/usuario/${id}`);
    dispatch({
      type: action.GET_USER_BY_ID,
      payload: res.data,
    });
    dispatch(ready());
  } catch (error) {
    console.log(error);
    dispatch({
      type: action.GET_USER_BY_ID,
      payload: error,
    });
    dispatch(ready());
  }
};


// ========================* PRODUCTOS *========================
export function createProduct(product) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/products`, product);
      console.log(response.data);
      dispatch({ type: action.CREATE_PRODUCT, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: action.CREATE_PRODUCT, payload: error });
    }
  };
}

// * 2. action-creator para obtener todos los productos del back-end

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const response = await axios.get(`${URL}/products`);
      const data = response.data.map(prod => {

        let discount = Math.ceil((prod.normal_price - prod.discount_price) / prod.normal_price * 100)
        if (19 <= discount && discount <= 21) discount = 20
        if (34 <= discount && discount <= 36) discount = 35
        if (44 <= discount && discount <= 46) discount = 45
        return {
          ...prod,
          discount
        }
      })
      console.log(data);
      dispatch({ type: action.GET_ALL_PRODUCTS, payload: data });
      dispatch(ready());
    } catch (error) {
      console.log(error);
      dispatch({ type: action.GET_ALL_PRODUCTS, payload: error });
      dispatch(ready());
    }
  };
};

export const getFamilies = () => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const response = await axios.get(`${URL}/categorias/families`);
      console.log(response.data);
      dispatch({ type: action.GET_FAMILIES, payload: response.data });
      dispatch(ready());
    } catch (error) {
      console.log(error);
      // dispatch({ type: action.GET_ALL_PRODUCTS, payload: error });
      dispatch(ready());
    }
  };
};

// * 3.action-creator para obtener producto por ID

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch(loading());
    const res = await axios.get(`${URL}/products/${id}`);
    dispatch({
      type: action.GET_PRODUCT_BY_ID,
      payload: res.data,
    });
    dispatch(ready());
  } catch (error) {
    console.log(error);
    dispatch({
      type: action.GET_PRODUCT_BY_ID,
      payload: error,
    });
    dispatch(ready());
  }
};

// * 4.action-creator para obtener producto por nombre

export const getProductByName = (name) => async (dispatch) => {
  // return { type: action.GET_PRODUCT_BY_NAME, payload: name };
  try {
    dispatch(loading());
    const res = await axios.get(`${URL}/products?name=${name}`);
    const result = res.data;
    console.log('this', result);
    dispatch({
      type: action.GET_PRODUCT_BY_NAME,
      payload: result,
    });
    dispatch(ready());
  } catch (error) {
    console.log(error);
  }
};

// * 5. action-creator para obtener producto por categoría

export const getProductByCategory = (category) => {
  return { type: action.FILTER_BY_CATEGORY, payload: category };
};

// * 6. action-creator para ordenar productos por nombre ascendente

export const orderedByNameASC = () => {
  return { type: action.ORDERED_BY_NAME_ASC };
};

// * 7. action-creator para ordenar productos por nombre descendente
export const orderedByNameDESC = () => {
  return { type: action.ORDERED_BY_NAME_DESC };
};

// * 8. action-creator para ordenar productos por menor precio

export const orderedByLowestPrice = () => {
  return { type: action.ORDERED_BY_LOWEST_PRICE };
};

export function cleanReviews() {
  return {
    type: action.CLEAN_REVIEWS,
  };
}

export function loading() {
  return {
    type: action.LOADING,
  };
}
// * 9. action-creator para ordenar productos por mayor precio

export const orderedByHighestPrice = () => {
  return { type: action.ORDERED_BY_HIGHEST_PRICE };
};
export const orderedByRecientes = () => {
  return { type: action.ORDERED_BY_RECIENTES };
};
// * 10. action-creator para filtrar productos por condicion (Nuevo,Usado,Reacondicionado,Ofertas)

export const filterByBrand = (brand) => {
  return {
    type: action.FILTER_BY_BRAND,
    payload: brand
  };
};
export const filterByOffers = (discount) => {
  return {
    type: action.FILTER_BY_OFERTAS,
    payload: discount
  };
};

// * 11. action-creator para filtrar productos por categoria
export function getCategorys() {
  return async function (dispatch) {
    const resp = await axios.get(`${URL}/categorias`);
    dispatch({
      type: action.GET_CATEGORY,
      payload: resp.data,
    });
  };
}

//*12. action-cargar ciudades para los formularios de registro comercio y cliente

export function getAllCities() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/ciudad`);
      // console.log(response.data);
      dispatch({ type: action.GET_ALL_CITIES, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: action.GET_ALL_CITIES, payload: error });
    }
  };
}

// CODIGO REALIZADO POR FRANCO
export function getProducts() {
  return (dispatch) => {
    dispatch(loading());
    axios
      .get(`${URL}/products`)
      .then(
        (response) =>
          dispatch({
            type: action.GET_PRODUCTS,
            payload: response.data,
          }),
        dispatch(ready())
      )
      .catch((err) => console.log(err));
    dispatch(ready());
  };
}

export function getDetail(id) {
  return (dispatch) => {
    dispatch(loading());
    axios
      .get(`${URL}/products/${id}`)
      .then(
        (response) =>
          dispatch({
            type: action.GET_DETAIL,
            payload: response.data,
          }),
        dispatch(ready())
      )
      .catch((err) => console.log(err));
    dispatch(ready());
  };
}

export function cleanProduct() {
  return {
    type: action.CLEAN_PRODUCT,
  };
}

export function ready() {
  return {
    type: action.READY,
  };
}

// MERCADO PAGO
export function mercadoPago(link) {
  console.log(link);
  return {
    type: action.MERCADO_PAGO,
    payload: link,
  };
}

export function cleanMercadoPago() {
  return {
    type: action.CLEAN_MERCADO_PAGO
  }
}
// REVIEWS // COMENTARIOS

export function getReviews(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/review/${id}`);
      console.log(response.data);
      dispatch({ type: action.REVIEWS, payload: response.data });
    } catch (error) {
      dispatch({ type: action.REVIEWS, payload: error });
    }
  };
}

// COMPRAS DEL USUARIO

export function getSales() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/venta`);
      // console.log(response);
      dispatch({
        type: action.GET_SALE_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: action.GET_SALE_BY_ID,
        payload: error,
      });
    }
  };
}

export function getSlider() {
  return { type: action.GET_SLIDER }
}
