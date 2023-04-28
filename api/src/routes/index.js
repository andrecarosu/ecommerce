const { Router } = require("express");
const router = Router();
const fs = require("fs")

// Importar todos los routers, Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers, Ejemplo: router.use('/auth', authRouter);




/**
 * !TODO: Esta ruta es dinamica no se necesita agregar ninguna ruta adicional que sean rutas claras y especificas
 */
const PATH_ROUTES = __dirname;
const removeExtends = (filename) => {
  //user.routes.js
  return filename.split(".").shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const fileClean = removeExtends(file);
  if (fileClean !== "index") {
    router.use(`/${fileClean}`, require(`./${file}`));
  } else {
    router.use("/notfound", (req, res) => {
      res.status(404).json({ message: "Algo inesperado sucedio :') !" });
    });
  }
});




module.exports = router;

/*el enlace que devuelve tu API al cliente es el enlace de pago de Mercado Pago generado para la transacción.
 Para que el cliente pueda pagar, debe hacer clic en este enlace. Por lo tanto, lo más común es que se genere un botón
  en el frontend con una etiqueta de "Pagar" o algo similar y se vincule con este enlace de pago.

Puedes crear el botón en HTML y asignarle la URL que obtienes en la respuesta de tu API, de esta manera:

<button onclick="window.location.href='ENLACE_DE_PAGO'">Pagar</button>
Deberás reemplazar ENLACE_DE_PAGO por la URL que obtienes como respuesta en tu API. Al hacer clic en este botón,
 el cliente será redirigido al enlace de pago de Mercado Pago para completar la transacción.*/