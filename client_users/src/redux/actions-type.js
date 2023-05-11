//* ACTION TYPES RELACIONADO CON EL CARRITO
const AGREGAR_AL_CARRITO = "AGREGAR_AL_CARRITO";
const BORRAR_DEL_CARRITO = "BORRAR_DEL_CARRITO";
const SUMAR_CANTIDAD_CARRITO = "SUMAR_CANTIDAD_CARRITO";
const RESTAR_CANTIDAD_CARRITO = "RESTAR_CANTIDAD_CARRITO";
const COUNT_SUMAR = "COUNT_SUMAR";
const COUNT_RESTAR = "COUNT_RESTAR";
const COUNT_AGREGAR = "COUNT_AGREGAR";
const COUNT_DELETE = "COUNT_DELETE";
const CLEAN_SHOPPING_CART = "CLEAN_SHOPPING_CART";
const REMOVE_SHOPPING_CART = "REMOVE_SHOPPING_CART";

//* ACTION TYPES RELACIONADOS CON LOS PRODUCTOS
const CREATE_PRODUCT = "CREATE_PRODUCT";
const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const ALLPRODUCTS = "ALLPRODUCTS"
const GET_CATEGORY = "GET_CATEGORY";
const GET_FAMILIES = "GET_FAMILIES"
const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
const FILTER_BY_CATEGORY = "GET_PRODUCT_BY_CATEGORY";
const ORDERED_BY_NAME_ASC = "ORDERED_BY_NAME_ASC";
const ORDERED_BY_NAME_DESC = "ORDERED_BY_NAME_DESC";
const ORDERED_BY_LOWEST_PRICE = "ORDERED_BY_LOWEST_PRICE"; //por  menor precio
const ORDERED_BY_HIGHEST_PRICE = "ORDERED_BY_HIGHEST_PRICE";// por mayor precio
const ORDERED_BY_RECIENTES = "ORDERED_BY_RECIENTES";
const FILTER_BY_NEW_PRODUCTS = "FILTER_BY_NEW_PRODUCTS"; //productos nuevos
const FILTER_BY_USED_PRODUCTS = "FILTER_BY_USED_PRODUCTS"; // productos usados
const FILTER_BY_BRAND = "FILTER_BY_BRAND"; //productos reacondicionados
const CLEAN_PRODUCT = "CLEAN_PRODUCT";
const CLEAN_REVIEWS = "CLEAN_REVIEWS";
const CLEAN_MERCADO_PAGO = "CLEAN_MERCADO_PAGO";
const FILTER_BY_OFERTAS = "FILTER_BY_OFERTAS";
const GET_SLIDER = "GET_SLIDER";
const SET_FILTERS_ACTIVE = "SET_FILTERS_ACTIVE"


//*ACTION TYPES RELACIONADOS CON LOS COMERCIOS

const GET_ALL_STORES = "GET_ALL_STORES";
const GET_STORES_BY_CITY = "GET_STORES_BY_CITY";
const GET_STORE_BY_NAME = "GET_STORE_BY_NAME";
const GET_STORE_BY_CATEGORY = "GET_STORE_BY_CATEGORY";

//* ACTION TYPES RELACIONADOS CON LAS VENTAS
const DETAILS_OF_SALES_BY_STORE = "DETAILS_OF_SALES_BY_STORE";
const GET_SALES = "GET_SALES";
const GET_SALE_BY_DATE = "GET_SALE_BY_FECHA";

//* ACTION TYPES RELACIONADO CON LOS PAGOS
const GET_PAYMENT_BY_ID = "GET_PAYMENT_BY_ID";
const GET_PAYMENT_BY_DATE = "GET_PAYMENT_BY_DATE";

//* ACTION TYPES RELACIONADOS CON EL USUARIO

const GET_USER_BY_ID = "GET_USER_BY_ID"; //buscar usuario por id
const USER_LOGIN = "USER_LOGIN"; // para cuando el usuario intente ingresar a la app
const FORGOT_PASSWORD = "FORGOT_PASSWORD"; //para cuando olvide contraseña
const REGISTER_USER = "REGISTER_USER"; // para el registro de usuario por 1ra vez
const USER_DETAILS = "USER_DETAILS";
const GET_ALL_CITIES = "GET_ALL_CITIES"; // para el registro de usurio por 1ra vez
const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";
const PUT_USER = "PUT_USER"; // actualiza los datos del usuario menos la contraseña
const PUT_PASSWORD_USER = "PUT_PASSWORD_USER"; // actualiza la contraseña del usuario
const NUMBER_PAGE = "NUMBER_PAGE";
const GET_ALL_USERS = "GET_ALL_USERS"
//* LOADER

const LOADING = "LOADING";
const READY = "READY";

// ACTIONS TYPES RELACIONADO CON MERCADO PAGO

const MERCADO_PAGO = "MERCADO_PAGO";
// REVIEWS // COMENTARIOS
const REVIEWS = "REVIEWS"

module.exports = {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_CATEGORY,
  GET_FAMILIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_NAME,
  ORDERED_BY_NAME_ASC,
  ORDERED_BY_NAME_DESC,
  FILTER_BY_CATEGORY,
  ORDERED_BY_LOWEST_PRICE,
  ORDERED_BY_HIGHEST_PRICE,
  FILTER_BY_NEW_PRODUCTS,
  FILTER_BY_USED_PRODUCTS,
  FILTER_BY_BRAND,
  GET_STORES_BY_CITY,
  GET_ALL_STORES,
  GET_STORE_BY_NAME,
  GET_USER_BY_ID,
  USER_LOGIN,
  FORGOT_PASSWORD,
  REGISTER_USER,
  USER_DETAILS,
  DETAILS_OF_SALES_BY_STORE,
  GET_SALE_BY_DATE,
  GET_SALES,
  GET_PAYMENT_BY_ID,
  GET_PAYMENT_BY_DATE,
  GET_STORE_BY_CATEGORY,
  AGREGAR_AL_CARRITO,
  BORRAR_DEL_CARRITO,
  GET_ALL_CITIES,
  CLEAN_PRODUCT,
  SUMAR_CANTIDAD_CARRITO,
  RESTAR_CANTIDAD_CARRITO,
  LOADING,
  READY,
  MERCADO_PAGO,
  CLEAN_MERCADO_PAGO,
  REVIEWS,
  CLEAN_REVIEWS,
  ORDERED_BY_RECIENTES,
  FILTER_BY_OFERTAS,
  GET_USER_BY_EMAIL,
  PUT_USER,
  PUT_PASSWORD_USER,
  COUNT_SUMAR,
  COUNT_RESTAR,
  COUNT_AGREGAR,
  COUNT_DELETE,
  GET_SLIDER,
  NUMBER_PAGE,
  GET_ALL_USERS,
  NUMBER_PAGE,
  ALLPRODUCTS,
  CLEAN_SHOPPING_CART,
  REMOVE_SHOPPING_CART,
  SET_FILTERS_ACTIVE,
};
