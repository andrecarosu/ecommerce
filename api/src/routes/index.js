const { Router } = require("express");
const router = Router();

// Importar todos los routers, Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers, Ejemplo: router.use('/auth', authRouter);

const usuarios = require("./usuario");
const product = require('./product')
const categories = require('./category')
const allproducts = require("./allProducts");


router.use("/usuario", usuarios);
router.use("/product", product);
router.use("/category", categories);
router.use("/allProducts", allproducts);






module.exports = router;

/*el enlace que devuelve tu API al cliente es el enlace de pago de Mercado Pago generado para la transacción.
 Para que el cliente pueda pagar, debe hacer clic en este enlace. Por lo tanto, lo más común es que se genere un botón
  en el frontend con una etiqueta de "Pagar" o algo similar y se vincule con este enlace de pago.

Puedes crear el botón en HTML y asignarle la URL que obtienes en la respuesta de tu API, de esta manera:

<button onclick="window.location.href='ENLACE_DE_PAGO'">Pagar</button>
Deberás reemplazar ENLACE_DE_PAGO por la URL que obtienes como respuesta en tu API. Al hacer clic en este botón,
 el cliente será redirigido al enlace de pago de Mercado Pago para completar la transacción.*/