import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CLEAN_PRODUCT,
  GET_PRODUCT_BY_NAME,
  GET_CATEGORY,
  GET_FAMILIES,
  ORDERED_BY_LOWEST_PRICE,
  ORDERED_BY_HIGHEST_PRICE,
  ORDERED_BY_NAME_DESC,
  ORDERED_BY_NAME_ASC,
  FILTER_BY_BRAND,
  FILTER_BY_OFERTAS,
  FILTER_BY_CATEGORY,
  AGREGAR_AL_CARRITO,
  BORRAR_DEL_CARRITO,
  SUMAR_CANTIDAD_CARRITO,
  RESTAR_CANTIDAD_CARRITO,
  COUNT_SUMAR,
  COUNT_DELETE,
  COUNT_AGREGAR,
  COUNT_RESTAR,
  USER_LOGIN,
  GET_USER_BY_ID,
  GET_USER_BY_EMAIL,
  PUT_USER,
  MERCADO_PAGO,
  CLEAN_MERCADO_PAGO,
  REVIEWS,
  CLEAN_REVIEWS,
  LOADING,
  READY,
  GET_SLIDER,
  GET_SALE_BY_ID,
  GET_ALL_CITIES,
} from "./actions-type.js";

const initialState = {
  products: JSON.parse(window.localStorage.getItem("products")) ||[], 
  productsFitered: JSON.parse(window.localStorage.getItem("filtered")) ||  [], //22
  copyProducts: JSON.parse(window.localStorage.getItem("copyProducts")) || [],
  productID: [],
  comercios: [],
  ventas: [],
  pagos: [],
  categorys: [],
  families: [],
  product: {},
  filter: [],
  slider: [],
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
    
// ========================* PRODUCTOS *========================

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

    case CLEAN_PRODUCT:
      return { ...state, product: [] };      

    case GET_PRODUCT_BY_NAME:
      return { ...state, productsFitered: action.payload };

    case GET_FAMILIES:
      return {
        ...state, families: action.payload };

    case GET_CATEGORY:
      return { ...state, categorys: action.payload };

// ========================* ORDENAMIENTO *========================

    case ORDERED_BY_NAME_DESC:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) =>
          b.name.localeCompare(a.name)
        ),
      };

    case ORDERED_BY_NAME_ASC:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      };

    case ORDERED_BY_LOWEST_PRICE:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.discount_price > b.discount_price) {
            return 1;
          }
          if (b.discount_price > a.discount_price) {
            return -1;
          }
          return 0;
        }),
      };

    case ORDERED_BY_HIGHEST_PRICE:
      return {
        ...state,
        productsFitered: [...state.productsFitered].sort((a, b) => {
          if (a.discount_price > b.discount_price) {
            return -1;
          }
          if (b.discount_price > a.discount_price) {
            return 1;
          }
          return 0;
        }),
      };

// ========================* FILTRADO *========================

    case FILTER_BY_CATEGORY:
          return {
            ...state,
            productsFitered: [...state.products].filter((product) => {
              return (
                product.Category_product.name ===
                action.payload
              );
            }),
            copyProducts: [...state.products].filter((product) => {
              return (
                product.Category_product.name ===
                action.payload
              );
            }),
         };

    case FILTER_BY_BRAND:
      return {
        ...state,
        productsFitered: state.copyProducts.filter(product => {
          return product.brand === action.payload
        }),
      };

    case FILTER_BY_OFERTAS:
      return {
        ...state,
        productsFitered: state.copyProducts.filter(
          (product) => product.discount === action.payload
        ),
        // copyProducts: state.productsFitered.filter(
        //   (product) => product.discount === action.payload
        // ),
      };

// ========================* CARRITO *========================

    case AGREGAR_AL_CARRITO:
      const itemExistente = state.carrito.find(
        (item) => item.product_id === action.payload.product.product_id
      );

      if (itemExistente) {
        return {
          ...state,
          carrito: state.carrito.map((item) =>
            item.product_id === action.payload.product.product_id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        //No esta en el carrito
        return {
          ...state,
          carrito: [
            ...state.carrito,
            { ...action.payload.product, amount: action.payload.quantity },
          ],
        };
      };
    
    case BORRAR_DEL_CARRITO:
      const filter = state.carrito.filter(
        (p) => p.product_id !== action.payload.product_id
      );
      return { ...state, carrito: filter };

    case SUMAR_CANTIDAD_CARRITO:
      return {
        ...state,
        carrito: state.carrito.map((product) =>
          product.product_id === action.payload.product_id
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
    
    case RESTAR_CANTIDAD_CARRITO:
      return {
        ...state,
        carrito: state.carrito.map((product) =>
          product.product_id === action.payload.product_id
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
      };
  
// ======================* CONTADOR CARRITO *======================

    case COUNT_AGREGAR:
      return {
        ...state,
        countCarrito: state.countCarrito + action.payload,
      };
      
    case COUNT_DELETE:
      return {
        ...state,
        countCarrito: state.countCarrito - action.payload,
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
    
// ========================* MERCADOPAGO *========================

    case MERCADO_PAGO:
      return { ...state, linkMercadoPago: action.payload };

    case CLEAN_MERCADO_PAGO:
      return { ...state, linkMercadoPago: "" };

// ========================* USUARIOS *========================
     
    case USER_LOGIN:
      return { ...state, logIn: action.payload };
  
    case GET_USER_BY_EMAIL:
      return { ...state, usuario: action.payload,};

    case GET_USER_BY_ID:
      return { ...state, usuario: action.payload };  
      
    case PUT_USER:
      return { ...state, usuario: action.payload };

// ========================* REVIEWS *========================
    
    case REVIEWS:
      return { ...state, reviews: action.payload };

    case CLEAN_REVIEWS:
      return { ...state, reviews: [] };
    
// ========================* LOADER *========================

    case LOADING:
      return { ...state, display: true };
  
    case READY:
      return { ...state, display: false };

// ========================* CARRUCEL *========================

    case GET_SLIDER:
      return {
        ...state,
        slider : [...state.products].filter(prod => {
            return prod.discount === 35
        })
      };

// ========================* OTROS *========================

    case GET_ALL_CITIES:
      return {
        ...state,
        slider : state.products.filter(prod => {
          return prod.discount === 45 || prod.discount === 35
        })
      };
    
    case GET_SALE_BY_ID:
      return { ...state, compras: action.payload };

    default:
      return state;
  }
};

export default rootReducer;
