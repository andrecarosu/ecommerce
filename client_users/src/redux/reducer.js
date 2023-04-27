import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_CATEGORY,
  ORDERED_BY_NAME_DESC,
  GET_CATEGORY,
  ORDERED_BY_LOWEST_PRICE,
  ORDERED_BY_HIGHEST_PRICE,
  FILTER_BY_NEW_PRODUCTS,
  FILTER_BY_USED_PRODUCTS,
  FILTER_BY_REFURBISHED_PRODUCTS,
  AGREGAR_AL_CARRITO,
  OFERTAS,
  ORDERED_BY_NAME_ASC,
  GET_ALL_CITIES,
  CLEAN_PRODUCT,
  BORRAR_DEL_CARRITO,
  SUMAR_CANTIDAD_CARRITO,
  RESTAR_CANTIDAD_CARRITO,
  LOADING,
  READY,
  USER_LOGIN,
  MERCADO_PAGO,
  ORDERED_BY_RECIENTES,
  GET_USER_BY_ID,
  REVIEWS,
  CLEAN_REVIEWS,
  GET_USER_BY_EMAIL,
  PUT_USER,
  PUT_PASSWORD_USER,
  GET_SALE_BY_ID,
  CLEAN_MERCADO_PAGO,
  COUNT_SUMAR,
  COUNT_AGREGAR,
  COUNT_RESTAR,
  COUNT_DELETE,
} from "./actions-type.js";

const initialState = {
  products: [], //22
  productsFitered: [], //22
  copyProducts: [],
  productID: [],
  comercios: [],
  ventas: [],
  pagos: [],
  categorys: [],
  product: {},
  filter: [],
  carrito: JSON.parse(window.localStorage.getItem("carrito")) || [],
  countCarrito: JSON.parse(window.localStorage.getItem("count")) || 0,
  ciudades: [],
  display: false,
  logIn: false,
  linkMercadoPago: "",
  usuario: [],
  reviews: [],
  compras: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        productsFitered: action.payload,
        copyProducts: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return { ...state, product: action.payload };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        productsFitered: action.payload,
      };

    case GET_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        productsFitered: [...state.products].filter((product) => {
          return (
            product.Categoria_producto.nombre_categoria_producto ===
            action.payload
          );
        }),
        copyProducts: [...state.products].filter((product) => {
          return (
            product.Categoria_producto.nombre_categoria_producto ===
            action.payload
          );
        }),
      };

    case ORDERED_BY_NAME_DESC:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) =>
          b.nombre.localeCompare(a.nombre)
        ),
      };

    case ORDERED_BY_NAME_ASC:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        ),
      };

    case GET_CATEGORY:
      return {
        ...state,
        categorys: action.payload,
      };

    case ORDERED_BY_LOWEST_PRICE:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.valor_con_descuento > b.valor_con_descuento) {
            return 1;
          }
          if (b.valor_con_descuento > a.valor_con_descuento) {
            return -1;
          }
          return 0;
        }),
      };

    case ORDERED_BY_HIGHEST_PRICE:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.valor_con_descuento > b.valor_con_descuento) {
            return -1;
          }
          if (b.valor_con_descuento > a.valor_con_descuento) {
            return 1;
          }
          return 0;
        }),
      };

    case FILTER_BY_NEW_PRODUCTS:
      return {
        ...state,
        productsFitered: state.copyProducts.filter(
          (item) => item.condicion === "Nuevo"
        ),
      };

    case FILTER_BY_USED_PRODUCTS:
      return {
        ...state,
        productsFitered: state.copyProducts.filter(
          (item) => item.condicion === "Usado"
        ),
      };

    case FILTER_BY_REFURBISHED_PRODUCTS:
      return {
        ...state,
        productsFitered: state.copyProducts.filter(
          (item) => item.condicion === "Reacondicionado"
        ),
      };

    case ORDERED_BY_RECIENTES:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          if (b.createdAt > a.createdAt) {
            return -1;
          }
          return 0;
        }),
        Copyproducts: [...state.productsFitered].sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          if (b.createdAt > a.createdAt) {
            return -1;
          }
          return 0;
        }),
      };

    case OFERTAS:
      return {
        ...state,
        productsFitered: state.products.filter(
          (product) => product.valor_con_descuento < 60
        ),
        copyProducts: state.products.filter(
          (product) => product.valor_con_descuento < 60
        ),
      };

    case AGREGAR_AL_CARRITO:
      const itemExistente = state.carrito.find(
        (item) => item.id_producto === action.payload.id.id_producto
      );

      if (itemExistente) {
        return {
          ...state,
          carrito: state.carrito.map((item) =>
            item.id_producto === action.payload.id.id_producto
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        //No esta en el carrito
        return {
          ...state,
          carrito: [
            ...state.carrito,
            { ...action.payload.id, cantidad: action.payload.quantity },
          ],
        };
      }

    case SUMAR_CANTIDAD_CARRITO:
      return {
        ...state,
        carrito: state.carrito.map((product) =>
          product.id_producto === action.payload.id_producto
            ? { ...product, cantidad: product.cantidad + 1 }
            : product
        ),
      };

    case RESTAR_CANTIDAD_CARRITO:
      return {
        ...state,
        carrito: state.carrito.map((product) =>
          product.id_producto === action.payload.id_producto
            ? { ...product, cantidad: product.cantidad - 1 }
            : product
        ),
      };

    case BORRAR_DEL_CARRITO:
      const filter = state.carrito.filter(
        (p) => p.id_producto !== action.payload.id_producto
      );
      console.log("filter   ", filter);

      return {
        ...state,
        carrito: filter,
      };
    case COUNT_AGREGAR:
      return {
        ...state,
        countCarrito: state.countCarrito + action.payload,
      };
    case COUNT_SUMAR:
      return {
        ...state,
        countCarrito: state.countCarrito + 1,
      };
    case COUNT_RESTAR:
      return {
        ...state,
        countCarrito: state.countCarrito - 1,
      };
    case COUNT_DELETE:
      return {
        ...state,
        countCarrito: state.countCarrito - action.payload,
      };

    case CLEAN_PRODUCT:
      return {
        ...state,
        product: [],
      };

    case CLEAN_REVIEWS:
      return {
        ...state,
        reviews: [],
      };
    case CLEAN_MERCADO_PAGO:
      return {
        ...state,
        linkMercadoPago: "",
      };
    case GET_ALL_CITIES:
      return {
        ...state,
        ciudades: action.payload,
      };

    case LOADING:
      return {
        ...state,
        display: true,
      };

    case READY:
      return {
        ...state,
        display: false,
      };

    case USER_LOGIN:
      return {
        ...state,
        logIn: action.payload,
      };

    case MERCADO_PAGO:
      return {
        ...state,
        linkMercadoPago: action.payload,
      };
    case GET_USER_BY_EMAIL:
      return {
        ...state,
        usuario: action.payload,
      };
    case REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case PUT_USER:
      return {
        ...state,
        usuario: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        usuario: action.payload,
      };
    case GET_SALE_BY_ID:
      return {
        ...state,
        compras: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
